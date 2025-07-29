import React, { useState, useEffect } from "react";
import logo from "../assets/ChatGPT Image Jul 10, 2025, 05_16_19 AM.png";
import "./landing.css";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Star, Users, Brain, MessageSquare, Menu, X } from "lucide-react";

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            icon: <MessageSquare className="h-8 w-8" />,
            title: "Smart Feedback Collection",
            description: "Streamlined forms that encourage honest, detailed student feedback",
        },
        {
            icon: <Brain className="h-8 w-8" />,
            title: "AI Sentiment Analysis",
            description: "Advanced AI analyzes emotions and sentiments in student responses",
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: "Lecturer Dashboard",
            description: "Comprehensive insights and analytics for continuous improvement",
        },
    ];

    const stats = [
        { number: "10k+", label: "Students Connected" },
        { number: "500+", label: "Lecturers" },
        { number: "98%", label: "Satisfaction Rate" },
        { number: "24/7", label: "AI Analysis" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const navigate = useNavigate();
    const handlebtn = () => {
        navigate("/feedback-form");
    };

    return (
        <div className="landing-page">
            <header className="fixed top-2.5 left-1/2 z-1000 flex h-(--header-height) w-9/10 -translate-x-1/2 transform items-center justify-center rounded-[30px] bg-[rgba(255_255_255_/_0.75)] p-[7.5px] backdrop-blur-md">
                <nav className="flex h-full w-full items-center justify-between">
                    <span className="flex h-full items-center gap-1">
                        <img src={logo} alt="Logo" className="aspect-square h-full rounded-full" />
                        <span className="text-2xl font-bold text-[#2c3e50]">
                            Edu<span className="text-pink-500 dark:text-pink-700">Pulse</span>
                        </span>
                    </span>

                    <ul
                        className={
                            "hidden items-center justify-center gap-[2rem] text-[#2c3e50] lg:flex"
                        }
                    >
                        <li>
                            <HashLink
                                smooth
                                className="text-[inherit] hover:text-[#1976d2]"
                                to="#features"
                            >
                                Features
                            </HashLink>
                        </li>
                        <li>
                            <HashLink
                                smooth
                                className="text-[inherit] hover:text-[#1976d2]"
                                to="#about"
                            >
                                About
                            </HashLink>
                        </li>
                        <li>
                            <HashLink
                                smooth
                                className="text-[inherit] hover:text-[#1976d2]"
                                to="#contact"
                            >
                                Contact
                            </HashLink>
                        </li>
                    </ul>

                    <a
                        className="nav-cta cursor-pointer rounded-full bg-gradient-to-br from-[#1976d2] to-[#42a5f5] px-6 py-2 font-semibold text-white transition-all duration-300"
                        onClick={handlebtn}
                    >
                        Get Started
                    </a>

                    <button
                        className="mobile-menu-btn block cursor-pointer border-0 bg-transparent text-[#2c3e50] hover:text-[#1976d2] lg:hidden"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    <div
                        onClick={toggleMenu}
                        className={`mobile-menu ${isMenuOpen ? "active" : ""}`}
                    >
                        <ul>
                            <li>
                                <HashLink smooth to="#features">
                                    Features
                                </HashLink>
                            </li>
                            <li>
                                <HashLink smooth to="#about">
                                    About
                                </HashLink>
                            </li>
                            <li>
                                <HashLink smooth to="#contact">
                                    Contact
                                </HashLink>
                            </li>
                        </ul>
                        <a onClick={handlebtn} className="btn-primary">
                            Get Started
                        </a>
                    </div>
                </nav>
            </header>

            <section className="hero">
                <div className="hero-content fade-in">
                    <h1>Transform Student Feedback with AI-Powered Insights</h1>
                    <p>
                        EDUPULSE revolutionizes how educators collect and analyze student feedback
                        using advanced sentiment analysis to improve teaching quality and student
                        satisfaction.
                    </p>
                </div>

                <div className="hero-visual fade-in">
                    <div className="mockup">
                        <div className="mockup-header">
                            <div className="mockup-dot"></div>
                            <div className="mockup-dot"></div>
                            <div className="mockup-dot"></div>
                        </div>
                        <div className="mockup-content">
                            <div className="feedback-item">
                                <p>
                                    "The professor explains concepts very clearly and is always
                                    available for questions."
                                </p>
                                <span className="sentiment-badge">😊 Positive</span>
                            </div>
                            <div className="feedback-item">
                                <p>"Could use more interactive examples during lectures."</p>
                                <span className="sentiment-badge">⚠ Constructive</span>
                            </div>
                            <div className="feedback-item">
                                <p>"Excellent course structure and engaging content!"</p>
                                <span className="sentiment-badge">🎉 Very Positive</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features" id="features">
                <div className="features-container">
                    <h2>Powerful Features for Modern Education</h2>
                    <p className="features-subtitle">
                        Harness the power of AI to understand student sentiment and improve
                        educational outcomes
                    </p>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card fade-in">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats" id="about">
                <div className="stats-container">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item fade-in">
                            <h3>{stat.number}</h3>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-container">
                    <h2>Ready to Transform Your Teaching?</h2>
                    <p>
                        Join thousands of educators who are already using EDUPULSE to enhance their
                        teaching experience.
                    </p>
                    <div className="cta-buttons">
                        <p className="btn-secondary" onClick={handlebtn}>
                            Submit Feedback
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer-landing" id="contact">
                <div className="footer-container">
                    <div className="footer-section">
                        <h3>EDUPULSE</h3>
                        <p>Revolutionizing education through AI-powered feedback analysis.</p>
                    </div>
                    <div className="contact-section">
                        <h3>Contact us</h3>
                        <p className="pcon">
                            📞 <a href="tel:+2349162980663">+2349162980663</a>
                        </p>
                        <p className="pcon">
                            📧 <a href="mailto:edupulse@gmail.com">edupulse360@gmail.com</a>
                        </p>
                    </div>
                    <div className="footer-section">
                        <h3>Company</h3>
                        <ul>
                            <li>
                                <a href="#about">About</a>
                            </li>
                            <li>
                                <a href="#features">Features</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 EDUPULSE. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
