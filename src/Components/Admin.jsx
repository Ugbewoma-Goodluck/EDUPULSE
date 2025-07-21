import "./Admin.css";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import Feedback from "./Feedback";
import FeedbackTrend from "./FeedbackTrend";

import Skeleton from "@mui/material/Skeleton";
import { ChartPieInteractive } from "@/components/ChartPieInteractive";
import { ChartLineLinear } from "@/components/ChartLineLinear";

import { MessageSquare,Smile, Meh, Frown, ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Admin = ({ feedback, setFeedback }) => {
    const [loading, setLoading] = useState(true);
    const [dataRange, setDataRange] = useState({ start: 0, end: 5 });
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
            <div className="bento title-container pt-[0_!important]">
                <span className="title title-2">Admin Dashboard</span>
            </div>
            <div className="bento overview feedback-cards box">
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
            <div className="content-box bento feedback-table flex-col">
                <div className="table__title">
                    <span className="table__title-text flex gap-1.5">
                        <span className="icon">
                            <MessageSquare size={25} />
                        </span>
                        Last five feedbacks:
                    </span>
                    <Link to="feedback" className="table__see-more">
                        See all
                    </Link>
                </div>
                <table className={`table ${loading && "loading-cells"}`}>
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Lecturer</th>
                            <th>Feedback</th>
                            <th>Sentiment</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            ? Array.from({ length: 5 }).map((_, i) => (
                                  <tr key={i}>
                                      <td colSpan={6}>
                                          <Skeleton
                                              variant="rectangular"
                                              width="100%"
                                              height={40}
                                              animation="wave"
                                          />
                                      </td>
                                  </tr>
                              ))
                            : feedback.slice(dataRange.start, dataRange.end).map((k) => {
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
