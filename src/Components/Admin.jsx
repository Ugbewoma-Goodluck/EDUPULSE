// src/components/Admin.jsx
import { useEffect } from 'react';
import { db } from '../firebase';
import { useState } from 'react';
import SentimentChart from './SentimentChart';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import './Admin.css';
import Feedback from './Feedback';
import { Link } from 'react-router-dom';
import FeedbackTrend from './FeedbackTrend';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { ChartPieInteractive } from '@/components/ChartPieInteractive';
import { ChartLineLinear } from '@/components/ChartLineLinear';

const Admin = ({ feedback, setfeedback }) => {
    const [loading, setloading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, 'feedback'), orderBy('createdAt', 'desc'));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setfeedback(data);
                setloading(false);
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        };

        fetchData();
    }, [setfeedback]);

    const renderSentiment = (sentiment) => {
        if (!sentiment) return 'Unknown';

        const formatted = sentiment.charAt(0).toUpperCase() + sentiment.slice(1).toLowerCase();

        return formatted;
    };
    const total = feedback.length;
    const positive = feedback.filter((f) => f.sentiment === 'positive').length;
    const neutral = feedback.filter((f) => f.sentiment === 'neutral').length;
    const negative = feedback.filter((f) => f.sentiment === 'negative').length;
    const sentimentPercentage = {
        positive: ((positive / total) * 100).toFixed(2),
        neutral: ((neutral / total) * 100).toFixed(2),
        negative: ((negative / total) * 100).toFixed(2),
    };
    const myData = [
        { type: 'positive', feedbacks: positive },
        { type: 'neutral', feedbacks: neutral },
        { type: 'negative', feedbacks: negative },
    ];
    return (
        <>
            {loading ? (
                <>
                    <Skeleton height={80} style={{ marginBottom: '1rem' }} />
                    <Skeleton height={80} style={{ marginBottom: '1rem' }} />
                    <Skeleton height={80} style={{ marginBottom: '1rem' }} />
                </>
            ) : (
                <>
                    <div className="bento title-container">
                        <span className="title title-2">Admin Dashboard</span>
                    </div>
                    <div className="bento overview feedback-cards">
                        <div className="feedback-card info">
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
                    <div className="content-box bento feedback-trend gap-4 flex-col">
                        {/* <FeedbackTrend feedback={feedback} /> */}
                        <ChartLineLinear />
                    </div>
                    <div className="content-box bento sentiment-chart gap-4 flex-col">
                        {/* <SentimentChart feedback={feedback} /> */}
                        <ChartPieInteractive
                            data={myData}
                            valueKey="feedbacks"
                            title="All Feedbacks"
                            description="January 2025 - date"
                            centerLabel="Feedbacks"
                        />
                    </div>
                    <div className="content-box bento feedback-table flex-col">
                        <div className="table__title">
                            <span className="table__title-text">
                                <span className="icon">
                                    <Icon height="25" width="25" icon="hugeicons:chart-03" />
                                </span>
                                Last five feedbacks:
                            </span>
                            <span className="table__see-more">See more</span>
                        </div>
                        <table className="table">
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
                                {feedback.slice(0, 5).map((k) => {
                                    return (
                                        <tr key={k.id} className="feedback-item">
                                            <td data-label="Course Code:">{k.C_code}</td>
                                            <td data-label="Lecturer's name:">{k.lname}</td>
                                            <td data-label="Feedback:">"{k.feedback}"</td>
                                            <td
                                                data-label="Sentiment:"
                                                className={`sentiment ${
                                                    k.sentiment?.toLowerCase() || 'unknown'
                                                }`}
                                            >
                                                {' '}
                                                {renderSentiment(k.sentiment)}{' '}
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
                    <p className="bento footer">© 2025 EduPulse. All rights reserved.</p>
                </>
            )}
        </>
    );
};

export default Admin;
