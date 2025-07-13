// import './styles/index.css';
// import './styles/component-styles.css';

import Student from './components/Student.jsx';
import Admin from './components/Admin.jsx';
import Login from './components/Login.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Feedback from './components/Feedback.jsx';
import { useState, useEffect } from 'react';
import DashboardLayout from './components/DashboardLayout.jsx';
import Feedbacktrend from './components/FeedbackTrend.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SentimentChart from './components/SentimentChart.jsx';
import { Toaster } from 'react-hot-toast';

const App = () => {
    const [feedback, setfeedback] = useState([]);
    return (
        <BrowserRouter>
            <Toaster position="center" />
            <Routes>
                <Route
                    path="/Dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardLayout />
                        </PrivateRoute>
                    }
                >
                    <Route
                        path="feedback"
                        element={<Feedback feedback={feedback} setfeedback={setfeedback} />}
                    />
                    <Route
                        index
                        element={
                            <PrivateRoute>
                                {' '}
                                <Admin feedback={feedback} setfeedback={setfeedback} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="admin"
                        element={
                            <PrivateRoute>
                                {' '}
                                <Admin feedback={feedback} setfeedback={setfeedback} />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route
                    path="/"
                    element={<Student feedback={feedback} setfeedback={setfeedback} />}
                />
                <Route
                    path="/feedbacktrend"
                    element={
                        <PrivateRoute>
                            <Feedbacktrend feedback={feedback} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/sentiment"
                    element={
                        <PrivateRoute>
                            <SentimentChart feedback={feedback} />
                        </PrivateRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;
