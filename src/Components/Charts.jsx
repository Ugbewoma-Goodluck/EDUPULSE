import "./Admin.css";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";

import Skeleton from "@mui/material/Skeleton";
import { ChartPieInteractive } from "@/components/ChartPieInteractive";
import { ChartLineLinear } from "@/components/ChartLineLinear";

import { MessageSquare, Smile, Meh, Frown, ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Charts = ({ feedback, setFeedback }) => {
    const [loading, setLoading] = useState(true);

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
    const myData = [
        { type: "positive", feedbacks: positive },
        { type: "neutral", feedbacks: neutral },
        { type: "negative", feedbacks: negative },
    ];

    return (
        <>
            <div
                className={`content-box bento feedback-trend box flex-col gap-4 ${loading && "still-loading"}`}
            >
                <ChartLineLinear />
                {loading && (
                    <Skeleton
                        variant="rectangular"
                        className="custom-skeleton box absolute inset-0 z-1000"
                        animation="wave"
                    />
                )}
            </div>
            <div
                className={`content-box bento sentiment-chart box flex-col gap-4 ${loading && "still-loading"}`}
            >
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
                        animation="wave"
                    />
                )}
            </div>
        </>
    );
};

export default Charts;
