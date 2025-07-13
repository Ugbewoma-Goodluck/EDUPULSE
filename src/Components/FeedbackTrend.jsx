// components/FeedbackTrend.jsx
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import './admin.css'; // Ensure you have the correct path to your CSS file

const FeedbackTrend = ({ feedback }) => {
    // Group feedback by date (yyyy-mm-dd)
    const dateCounts = {};

    // Ensure feedback is an array
    if (Array.isArray(feedback)) {
        feedback.forEach((item) => {
            // Support both Firestore Timestamp and JS Date
            let dateObj = null;
            if (item.createdAt) {
                if (item.createdAt.seconds) {
                    dateObj = new Date(item.createdAt.seconds * 1000);
                } else if (typeof item.createdAt === 'string' || item.createdAt instanceof Date) {
                    dateObj = new Date(item.createdAt);
                }
            }
            if (dateObj && !isNaN(dateObj)) {
                const dateStr = format(dateObj, 'yyyy-MM-dd');
                dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
            }
        });
    }

    // Convert to array of { date, count } and sort by date
    const chartData = Object.entries(dateCounts)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div style={{ width: '70%', height: 400, marginBottom: '60px' }}>
            <h3>📊 Feedback Trend Over Time</h3>
            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default FeedbackTrend;
