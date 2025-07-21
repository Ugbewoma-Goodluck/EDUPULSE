import "./Admin.css";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";

import Skeleton from "@mui/material/Skeleton";
import { MessageSquare, Smile, Meh, Frown, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Feedback = ({ feedback, setFeedback }) => {
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        course: "",
        lecturer: "",
        sentiment: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFeedback(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching feedback:", error);
                toast.warning("Error fetching feedbacks");
            }
        };

        fetchData();
    }, [setFeedback]);

    const handleClear = async () => {
        const confirmed = window.confirm("Are you sure you want to delete all feedback?");
        if (!confirmed) return;

        try {
            const snapshot = await getDocs(collection(db, "feedback"));
            const deletions = snapshot.docs.map((docItem) =>
                deleteDoc(doc(db, "feedback", docItem.id)),
            );
            await Promise.all(deletions);
            setFeedback([]); // Clear local state
            toast.success("All feedback has been deleted.");
        } catch (error) {
            console.error("Error deleting feedback:", error);
            toast.error("Failed to delete feedback. Try again.");
        }
    };

    const renderSentiment = (sentiment) => {
        if (!sentiment) return "Unknown";
        const formatted = sentiment.charAt(0).toUpperCase() + sentiment.slice(1).toLowerCase();
        return formatted;
    };

    const total = feedback.length;
    const positive = feedback.filter((f) => f.sentiment.toLowerCase() === "positive").length;
    const neutral = feedback.filter((f) => f.sentiment.toLowerCase() === "neutral").length;
    const negative = feedback.filter((f) => f.sentiment.toLowerCase() === "negative").length;
    const sentimentPercentage = {
        positive: ((positive / total) * 100).toFixed(2),
        neutral: ((neutral / total) * 100).toFixed(2),
        negative: ((negative / total) * 100).toFixed(2),
    };
    return (
        <>
            <div className="bento title-container pt-[0_!important]">
                <span className="title title-2">All Feedbacks</span>

                <motion.div
                    className="selectors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Input
                        type="text"
                        placeholder="Filter by Course"
                        value={filters.course}
                        onChange={(e) =>
                            setFilters({ ...filters, course: e.target.value.toLowerCase() })
                        }
                    />
                    <Input
                        type="text"
                        placeholder="Filter by Lecturer"
                        value={filters.lecturer}
                        onChange={(e) =>
                            setFilters({ ...filters, lecturer: e.target.value.toLowerCase() })
                        }
                    />
                    <Select
                        className="select"
                        value={filters.sentiment}
                        onValueChange={(value) => setFilters({ ...filters, sentiment: value })}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter sentiments" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sentiments</SelectLabel>
                                <SelectItem value="all">All Sentiments</SelectItem>
                                <SelectItem value="positive">Positive</SelectItem>
                                <SelectItem value="neutral">Neutral</SelectItem>
                                <SelectItem value="negative">Negative</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Button onClick={handleClear} variant="destructive">
                        <Trash2 />
                        Clear all Feedbacks
                    </Button>
                </motion.div>
            </div>
            <div className="bento overview feedback-cards box">
                <motion.div
                    className="contents"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 3 }}
                >
                    <div className="feedback-card info">
                        <div className="left">
                            <span
                                className={`value relative min-w-[25%] text-center ${loading && "still-loading"}`}
                            >
                                <span>{total}</span>
                                {loading && (
                                    <Skeleton
                                        variant="text"
                                        className="absolute inset-0"
                                        width="100%"
                                        height="100%"
                                        animation="wave"
                                    />
                                )}
                            </span>
                            <span className="label">Total Feedbacks</span>
                        </div>
                        <span className="icon">
                            <MessageSquare size={40} />
                        </span>
                    </div>

                    <div className="feedback-card positive">
                        <div className="left">
                            <span className={`value ${loading && "still-loading"}`}>
                                <span>
                                    {positive} ({sentimentPercentage.positive}%)
                                </span>
                                {loading && (
                                    <Skeleton
                                        variant="text"
                                        className="absolute inset-0"
                                        width="100%"
                                        height="100%"
                                        animation="wave"
                                    />
                                )}
                            </span>
                            <span className="label">Positive Feedbacks</span>
                        </div>
                        <span className="icon">
                            <Smile size={40} />
                        </span>
                    </div>

                    <div className="feedback-card neutral">
                        <div className="left">
                            <span className={`value ${loading && "still-loading"}`}>
                                <span>
                                    {neutral} ({sentimentPercentage.neutral}%)
                                </span>
                                {loading && (
                                    <Skeleton
                                        variant="text"
                                        className="absolute inset-0"
                                        width="100%"
                                        height="100%"
                                        animation="wave"
                                    />
                                )}
                            </span>
                            <span className="label">Neutral Feedbacks</span>
                        </div>
                        <span className="icon">
                            <Meh size={40} />
                        </span>
                    </div>

                    <div className="feedback-card negative">
                        <div className="left">
                            <span className={`value ${loading && "still-loading"}`}>
                                <span>
                                    {negative} ({sentimentPercentage.negative}%)
                                </span>
                                {loading && (
                                    <Skeleton
                                        variant="text"
                                        className="absolute inset-0"
                                        width="100%"
                                        height="100%"
                                        animation="wave"
                                    />
                                )}
                            </span>
                            <span className="label">Negative Feedbacks</span>
                        </div>
                        <span className="icon">
                            <Frown size={40} />
                        </span>
                    </div>
                </motion.div>
            </div>
            {feedback.length === 0 ? (
                <div className="content-box bento feedback-table border-2 border-dashed">
                    <p className="flex h-full w-full items-center justify-center p-4">
                        No feedbacks yet.
                    </p>
                </div>
            ) : (
                <div className="content-box bento feedback-table flex-col">
                    <div className="table__title">
                        <span className="table__title-text flex gap-1.5">
                            <span className="icon">
                                <MessageSquare size={25} />
                            </span>
                            All Feedbacks:
                        </span>
                    </div>
                    <table className={`table ${loading && "loading-cells"}`}>
                        <thead style={{ backgroundColor: "#f0f0f0" }}>
                            <tr>
                                <th>Course</th>
                                <th>Lecturer</th>
                                <th>Feedback</th>
                                <th>Sentiment</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedback
                                .filter(
                                    (f) =>
                                        f.C_code.toLowerCase().includes(filters.course) &&
                                        f.lname.toLowerCase().includes(filters.lecturer) &&
                                        (filters.sentiment === "" ||
                                            filters.sentiment === "all" ||
                                            (f.sentiment &&
                                                f.sentiment.toLowerCase() ===
                                                    filters.sentiment.toLowerCase())),
                                )
                                .map((f) => {
                                    return (
                                        <motion.tr
                                            key={f.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 3 }}
                                        >
                                            <td data-label="Course Code:">{f.C_code}</td>
                                            <td data-label="Lecturer's name:">{f.lname}</td>
                                            <td data-label="Feedback:">{f.feedback}</td>
                                            <td
                                                className={`sentiment ${
                                                    f.sentiment?.toLowerCase() || "unknown"
                                                }`}
                                                data-label="Sentiment:"
                                            >
                                                {renderSentiment(f.sentiment)}
                                            </td>
                                            <td data-label="Date:">
                                                {f.createdAt?.toDate().toLocaleDateString()}
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default Feedback;
