import LandingPage from "@/pages/LandingPage.jsx";
import NotFound404 from "@/pages/404.jsx";
import Student from "@/pages/Student";
import Login from "@/pages/Login";
import PrivateRoute from "./PrivateRoute.jsx";
import Admin from "@/components/Admin.jsx";
import Feedback from "@/components/Feedback.jsx";
import Charts from "@/components/Charts.jsx";
import { useState } from "react";
import DashboardLayout from "./components/DashboardLayout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

const App = () => {
    document.title = "Testing...";

    const [feedback, setFeedback] = useState([]);
    return (
        <BrowserRouter>
            <Toaster richColors position="top-center" />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardLayout />
                        </PrivateRoute>
                    }
                >
                    <Route
                        index
                        element={
                            <PrivateRoute>
                                <Admin feedback={feedback} setFeedback={setFeedback} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="admin"
                        element={
                            <PrivateRoute>
                                <Admin feedback={feedback} setFeedback={setFeedback} />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="feedback"
                        element={<Feedback feedback={feedback} setFeedback={setFeedback} />}
                    />
                    <Route
                        path="charts"
                        element={<Charts feedback={feedback} setFeedback={setFeedback} />}
                    />
                </Route>
                <Route
                    path="/feedback-form"
                    element={<Student feedback={feedback} setFeedback={setFeedback} />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound404 />} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;
