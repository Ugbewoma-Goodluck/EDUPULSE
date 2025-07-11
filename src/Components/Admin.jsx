// src/Components/Admin.jsx
import { useEffect } from "react";
import { db } from "../firebase";
import { useState } from "react";
import SentimentChart from "./SentimentChart";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./Admin.css";
import Feedback from "./Feedback";
import { Link } from "react-router-dom";
import FeedbackTrend from "./FeedbackTrend";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Admin = ({ feedback, setfeedback }) => {
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "feedback"),
          orderBy("createdAt", "desc")
        );
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

    const formatted =
      sentiment.charAt(0).toUpperCase() + sentiment.slice(1).toLowerCase();

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
    <div className="maindiv">
      {loading ? (
        <>
          <Skeleton height={80} style={{ marginBottom: "1rem" }} />
          <Skeleton height={80} style={{ marginBottom: "1rem" }} />
          <Skeleton height={80} style={{ marginBottom: "1rem" }} />
        </>
      ) : (
        <div>
          <h1 className="header-1">Welcome to the Admin dashboard</h1>
          <div className="admin-header">
            <h6>The total feedback is : {total}</h6>
            <h6 className="pfeedback">
              Positive Feedback: {positive} ({sentimentPercentage.positive}%)
            </h6>
            <h6 className="nefeedback">
              Neutral Feedback: {neutral} ({sentimentPercentage.neutral}%)
            </h6>
            <h6 className="nfeedback">
              Negative Feedback: {negative} ({sentimentPercentage.negative}%)
            </h6>
          </div>
          <FeedbackTrend feedback={feedback} />
          <SentimentChart feedback={feedback} />
          <div style={{ marginTop: "80px" }}>
            <h4>Last five feedbacks:</h4>
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
                {feedback.slice(0, 5).map((k) => {
                  return (
                    <tr key={k.id} className="feedback-item">
                      <td data-label="Course Code:">{k.C_code}</td>
                      <td data-label="Lecturer's name:">{k.lname}</td>
                      <td data-label="Feedback:">{k.feedback}</td>
                      <td
                        data-label="Sentiment:"
                        className={`sentiment ${
                          k.sentiment?.toLowerCase() || "unknown"
                        }`}
                      >
                        {" "}
                        {renderSentiment(k.sentiment)}{" "}
                      </td>
                      <td data-label="Date:">
                        {k.createdAt?.toDate().toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="footer">© 2025 EduPulse. All rights reserved.</p>
        </div>
      )}
    </div>
  );
};

export default Admin;
