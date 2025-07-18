import { useEffect } from "react";
import { db } from "../firebase";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { auth } from "../firebase";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import "./Admin.css";
const Feedback = ({ feedback, setfeedback }) => {
    const [filters, setFilters] = useState({
        course: "",
        lecturer: "",
        sentiment: "",
    });

    // Fetch feedback from Firestore
    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setfeedback(data);
            } catch (error) {
                console.error("Error fetching feedback:", error);
            }
        };

        fetchData();
    }, [setfeedback]);
    const handleclear = async () => {
        const confirmed = window.confirm("Are you sure you want to delete all feedback?");
        if (!confirmed) return;

        try {
            const snapshot = await getDocs(collection(db, "feedback"));
            const deletions = snapshot.docs.map((docItem) =>
                deleteDoc(doc(db, "feedback", docItem.id)),
            );
            await Promise.all(deletions);
            setfeedback([]); // Clear local state
            alert("All feedback has been deleted.");
        } catch (error) {
            console.error("Error deleting feedback:", error);
            alert("Failed to delete feedback. Try again.");
        }
    };
    const renderSentiment = (sentiment) => {
        if (!sentiment) return "Unknown";

        const formatted = sentiment.charAt(0).toUpperCase() + sentiment.slice(1).toLowerCase();

        return formatted;
    };
    const total = feedback.length;
    const positive = feedback.filter((f) => f.sentiment === "positive").length;
    const neutral = feedback.filter((f) => f.sentiment === "neutral").length;
    const negative = feedback.filter((f) => f.sentiment === "negative").length;
    const sentimentPercentage = {
        positive: ((positive / total) * 100).toFixed(2),
        neutral: ((neutral / total) * 100).toFixed(2),
        negative: ((negative / total) * 100).toFixed(2),
    };
    return (
        <>
            <h1 className="bento title head">Welcome to the Admin dashboard</h1>
            <motion.div
                className="selectors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 3 }}
            >
                <input
                    type="text"
                    placeholder="Search by Course"
                    value={filters.course}
                    onChange={(e) =>
                        setFilters({ ...filters, course: e.target.value.toLowerCase() })
                    }
                />
                <input
                    type="text"
                    placeholder="Search by Lecturer"
                    value={filters.lecturer}
                    onChange={(e) =>
                        setFilters({ ...filters, lecturer: e.target.value.toLowerCase() })
                    }
                />

                <select
                    className="sentiment-selector"
                    value={filters.sentiment}
                    onChange={(e) => setFilters({ ...filters, sentiment: e.target.value })}
                >
                    <option value="">All Sentiments</option>
                    <option value="positive">Positive</option>
                    <option value="neutral">Neutral</option>
                    <option value="negative">Negative</option>
                </select>
                <button onClick={handleclear} className="feedback-clear">
                    Clear all Feedbacks
                </button>
            </motion.div>
            <motion.div
                className="sentiment-stats"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 3 }}
            >
                <h6 className="total">Total feedback is:{total}</h6>
                <p className="positive">
                    Positive:{positive}({sentimentPercentage.positive}%)
                </p>
                <p className="neutral">
                    Neutral:{neutral} ({sentimentPercentage.neutral}%)
                </p>
                <p className="negative">
                    Negative:{negative} ({sentimentPercentage.negative}%)
                </p>
            </motion.div>
            <nav className="content-box bento table">
                {feedback.length === 0 ? (
                    <p>No feedback yet.</p>
                ) : (
                    <table className="feedback-table">
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
                                            (f.sentiment &&
                                                f.sentiment.toLowerCase() ===
                                                    filters.sentiment.toLowerCase())),
                                )
                                .map((f) => {
                                    console.log("Rendering Feedback:", {
                                        id: f.id,
                                        sentiment: f.sentiment,
                                        typeof: typeof f.sentiment,
                                    });

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
                )}
            </nav>
        </>
    );
};

export default Feedback;
