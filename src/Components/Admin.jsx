// src/components/Admin.jsx
import { useEffect } from "react";
import { db } from "../firebase";
import { useState } from "react";
import SentimentChart from "./SentimentChart";
import { useNavigate, Link } from "react-router-dom";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import "./Admin.css";
import Feedback from "./Feedback";
import FeedbackTrend from "./FeedbackTrend";

import Skeleton from "@mui/material/Skeleton";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ChartPieInteractive } from "@/components/ChartPieInteractive";
import { ChartLineLinear } from "@/components/ChartLineLinear";

import { ChevronRightIcon, ChevronLeftIcon, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Admin = ({ feedback, setfeedback }) => {
    const [loading, setloading] = useState(true);
    const [dataRange, setDataRange] = useState({ start: 0, end: 5 });
    const navigate = useNavigate();
    const step = 5;

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
                setloading(false);
            } catch (error) {
                console.error("Error fetching feedback:", error);
            }
        };

        fetchData();
    }, [setfeedback]);

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
    const myData = [
        { type: "positive", feedbacks: positive },
        { type: "neutral", feedbacks: neutral },
        { type: "negative", feedbacks: negative },
    ];
    return (
        <>
            <div className="bento title-container pt-[0_!important]">
                <span className="title title-2">Admin Dashboard</span>
            </div>
            <div className="bento overview feedback-cards still-loading box">
                <div className={`feedback-card info ${loading && "still-loading"}`}>
                    <div className="left">
                        <span className="value">{total}</span>
                        <span className="label">Total Feedbacks</span>
                    </div>
                    <span className="icon">
                        <Icon height="40" width="40" icon="hugeicons:chart-03" />
                    </span>
                </div>

                <div className="feedback-card positive">
                    <div className="left">
                        <span className="value">
                            {positive} ({sentimentPercentage.positive}%)
                        </span>
                        <span className="label">Positive Feedbacks</span>
                    </div>
                    <span className="icon">
                        <Icon height="40" width="40" icon="hugeicons:smile" />
                    </span>
                </div>

                <div className="feedback-card neutral">
                    <div className="left">
                        <span className="value">
                            {neutral} ({sentimentPercentage.neutral}%)
                        </span>
                        <span className="label">Neutral Feedbacks</span>
                    </div>
                    <span className="icon">
                        <Icon height="40" width="40" icon="hugeicons:neutral" />
                    </span>
                </div>

                <div className="feedback-card negative">
                    <div className="left">
                        <span className="value">
                            {negative} ({sentimentPercentage.negative}%)
                        </span>
                        <span className="label">Negative Feedbacks</span>
                    </div>
                    <span className="icon">
                        <Icon height="40" width="40" icon="hugeicons:sad-01" />
                    </span>
                </div>
            </div>
            <div
                className={`content-box bento feedback-trend box flex-col gap-4 ${loading && "still-loading"}`}
            >
                {/* <FeedbackTrend feedback={feedback} /> */}
                <ChartLineLinear />
                {loading && (
                    <Skeleton
                        variant="rectangular"
                        className="custom-skeleton box absolute inset-0 z-1000"
                        style={{ position: "absolute" }}
                        animation="wave"
                    />
                )}
            </div>
            <div
                className={`content-box bento sentiment-chart box flex-col gap-4 ${loading && "still-loading"}`}
            >
                {/* <SentimentChart feedback={feedback} /> */}
                <ChartPieInteractive
                    data={myData}
                    valueKey="feedbacks"
                    title="All Feedbacks"
                    description="January 2025 - date"
                    centerLabel="Feedbacks"
                />
                {loading && (
                    <Skeleton
                        variant="rectangular"
                        className="custom-skeleton box absolute inset-0 z-1000"
                        style={{ position: "absolute" }}
                        animation="wave"
                    />
                )}
            </div>
            <div className="content-box bento feedback-table flex-col">
                <div className="table__title">
                    <span className="table__title-text flex gap-1.5">
                        <span className="icon">
                            <Icon height="25" width="25" icon="hugeicons:chart-03" />
                        </span>
                        Last five feedbacks:
                    </span>
                    <a href="dashboard/feedback-table" className="table__see-more">
                        See all
                    </a>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Lecturer</th>
                            <th className="feedback">Feedback</th>
                            <th>Sentiment</th>
                            <th>Date</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedback.slice(dataRange.start, dataRange.end).map((k) => {
                            return (
                                <tr key={k.id} className="feedback-item">
                                    <td data-label="Course Code:">{k.C_code}</td>
                                    <td data-label="Lecturer's name:">{k.lname}</td>
                                    <td className="feedback" data-label="Feedback:">
                                        "{k.feedback}"
                                    </td>
                                    <td
                                        data-label="Sentiment:"
                                        className={`sentiment ${
                                            k.sentiment?.toLowerCase() || "unknown"
                                        }`}
                                    >
                                        {" "}
                                        {renderSentiment(k.sentiment)}{" "}
                                    </td>
                                    <td className="" data-label="Date:">
                                        {k.createdAt?.toDate().toLocaleDateString()}
                                    </td>
                                    <td>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="size-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Team</DropdownMenuItem>
                                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="table__foot flex items-center justify-end gap-2 py-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="size-7"
                        onClick={() =>
                            setDataRange((prev) => {
                                const newEnd = prev.start;
                                const newStart = Math.max(0, prev.start - step);
                                return { start: newStart, end: newEnd };
                            })
                        }
                        disabled={dataRange.start === 0}
                    >
                        <ChevronLeftIcon />
                    </Button>

                    <span className="table__range">
                        {dataRange.start + 1} – {Math.min(dataRange.end, feedback.length)} of{" "}
                        {feedback.length}
                    </span>

                    <Button
                        variant="outline"
                        size="icon"
                        className="size-7"
                        onClick={() =>
                            setDataRange((prev) => {
                                const newStart = prev.end;
                                const newEnd = Math.min(prev.end + step, feedback.length);
                                return { start: newStart, end: newEnd };
                            })
                        }
                        disabled={dataRange.end >= feedback.length}
                    >
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Admin;
