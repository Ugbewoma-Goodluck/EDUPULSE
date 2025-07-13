import { Icon } from '@iconify/react';
import { useContext, useState } from 'react';
import { db } from '../firebase';
import axios from 'axios';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import '../styles/student.css';
import toast from 'react-hot-toast';
import { ThemeContext } from '../context/ThemeContext';

// import

const Student = () => {
    const { isDark, toggleTheme } = useContext(ThemeContext);
    const [ssentiment, setsetimnet] = useState('');
    const [arr, setarr] = useState({
        C_code: '',
        lname: '',
    });
    const [sentimentMessage, setSentimentMessage] = useState('');
    const [loading, setloading] = useState(false);
    const [text, setText] = useState('');
    const handlechange = (e) => {
        const { name, value } = e.target;
        setSentimentMessage('');
        setarr((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const analyzeSentiment = async (text) => {
        const API_URL =
            'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment';
        const HF_TOKEN = import.meta.env.VITE_HF_TOKEN; // Replace with your Hugging Face token

        try {
            const response = await axios.post(
                API_URL,
                { inputs: text },
                {
                    headers: {
                        Authorization: `Bearer ${HF_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const labelMap = {
                label_0: 'negative',
                label_1: 'neutral',
                label_2: 'positive',
            };

            const predictions = response.data[0];
            const top = predictions.reduce((a, b) => (a.score > b.score ? a : b));
            const readableLabel = labelMap[top.label.toLowerCase()] || top.label;

            console.log('Mapped Sentiment:', readableLabel);
            return readableLabel; // This must come last
        } catch (err) {
            console.error('Error analyzing sentiment:', {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message,
            });

            return 'error';
        }
    };

    const handlesubmit = async (e) => {
        const API_URL =
            'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment';
        const HF_TOKEN = import.meta.env.VITE_HF_TOKEN; // Replace with your Hugging Face token

        e.preventDefault();

        if (!arr.C_code || !arr.lname || !text) {
            toast('Please fill in all fields.');
            return;
        }
        setloading(true);
        setarr({ C_code: '', lname: '' });
        setText('');
        const sentiment = await analyzeSentiment(text);
        console.log('Final sentiment to be stored:', sentiment);
        try {
            await addDoc(collection(db, 'feedback'), {
                C_code: arr.C_code,
                lname: arr.lname,
                feedback: text,
                sentiment: sentiment,
                createdAt: Timestamp.now(),
            });

            toast.success('Feedback submitted successfully!');
            setarr({ C_code: '', lname: '' });
            setText('');
        } catch (error) {
            toast.error('Error submitting feedback: ', error);
        } finally {
            setloading(false);
        }
        const pesponse = await axios.post(
            API_URL,
            { inputs: text },
            {
                headers: {
                    Authorization: `Bearer ${HF_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const sentimentScores = pesponse.data[0]; // array of 3 label-score pairs

        const topResult = sentimentScores.reduce((highest, current) =>
            current.score > highest.score ? current : highest
        );

        const sentimentLabels = {
            LABEL_0: 'Negative',
            LABEL_1: 'Neutral',
            LABEL_2: 'Positive',
        };

        const finalSentiment = sentimentLabels[topResult.label] || 'Unknown';

        setsetimnet(finalSentiment);

        if (finalSentiment === 'Positive') {
            setSentimentMessage('Thanks for sharing your honest opinion.');
        } else if (finalSentiment === 'Neutral') {
            setSentimentMessage('Thanks for your feedback. We’ll keep improving.');
        } else if (finalSentiment === 'Negative') {
            setSentimentMessage("Sorry to hear that. We'll work on making things better.");
        } else {
            setSentimentMessage('');
        }
    };

    return (
        <div className={`main-div ${isDark ? 'dark' : ''}`}>
            <div className="sdiv">
                <header>
                    <nav className="header-nav">
                        <Icon icon={'mdi:user'} className="icon" />
                        <h1>HELLO STUDENT!</h1>
                    </nav>
                    {isDark ? (
                        <Icon
                            icon="solar:sun-bold"
                            height={30}
                            width={30}
                            className="sun-icon"
                            onClick={() => toggleTheme()}
                        />
                    ) : (
                        <Icon
                            icon="line-md:moon-filled"
                            height={30}
                            width={30}
                            className="moon-icon"
                            onClick={() => toggleTheme()}
                        />
                    )}

                    <h5>How was your learning experience?</h5>
                </header>

                <main className="fmain">
                    <form onSubmit={handlesubmit}>
                        <div className="input-wrap">
                            <label>Course Name/Code:</label>
                            <input
                                type="text"
                                value={arr.C_code}
                                onChange={(e) => handlechange(e)}
                                placeholder="Enter Course name/code...."
                                name="C_code"
                            />
                        </div>

                        <div className="input-wrap">
                            <label>Lecturer's name:</label>
                            <input
                                type="text"
                                onChange={(e) => handlechange(e)}
                                value={arr.lname}
                                name="lname"
                                placeholder="Enter Lecturer name"
                            />
                        </div>

                        <div className="input-wrap">
                            <label>Feedback:</label>
                            <textarea
                                id="textarea"
                                placeholder="Type your feedback here..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>

                        <div className="input-wrap">
                            <input
                                className="submit-btn"
                                type="submit"
                                value={loading ? 'Submitting...' : 'Submit'}
                                disabled={loading}
                            />
                        </div>
                    </form>
                </main>
                {ssentiment && (
                    <div
                        className={`message-box ${
                            ssentiment === 'Positive'
                                ? 'message-positive'
                                : ssentiment === 'Negative'
                                ? 'message-negative'
                                : 'message-neutral'
                        }`}
                    >
                        <p className="message">{sentimentMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Student;
