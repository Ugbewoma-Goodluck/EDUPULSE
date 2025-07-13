// components/SentimentChart.jsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SentimentChart = ({ feedback }) => {
    // Count sentiments
    const sentimentCount = {
        positive: 0,
        neutral: 0,
        negative: 0,
    };

    feedback.forEach((item) => {
        const sentiment = item.sentiment?.toLowerCase();
        if (sentimentCount[sentiment] !== undefined) {
            sentimentCount[sentiment]++;
        }
    });

    // Convert to chart data format
    const chartData = [
        { name: 'Positive', value: sentimentCount.positive },
        { name: 'Neutral', value: sentimentCount.neutral },
        { name: 'Negative', value: sentimentCount.negative },
    ];

    const COLORS = ['#00C49F', '#FFBB28', '#FF4444'];

    return (
        <div style={{ width: '100%', height: 300 }}>
            <h3>📊 Sentiment Distribution</h3>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SentimentChart;
