import React, { useState, useEffect } from "react";
import logo from "../assets/ChatGPT Image Jul 10, 2025, 05_16_19 AM.png";
import "./landing.css";
import "odometer/themes/odometer-theme-default.css";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Users, Brain, MessageSquare, Menu, X } from "lucide-react";
import ScrollOdometerLib from "@/components/ScrollOdometerLib";

import heroImageLight from "@/assets/images/hero-dashboard-peek-light.png";
import heroImageLight1 from "@/assets/images/hero-dashboard-peek-light-1.png";
import heroImageLight2 from "@/assets/images/hero-dashboard-peek-light-2.png";
import heroImageDark from "@/assets/images/hero-dashboard-peek-dark.png";
import { useTheme } from "@/hooks/useTheme";

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);
    const navigate = useNavigate();

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
        {
            icon: <Brain className="h-8 w-8" />,
            title: "AI Sentiment Analysis",
            description: "Advanced AI analyzes emotions and sentiments in student responses",
        },
    ];

    const stats = [
        { number: "10k+", label: "Students Connected" },
        { number: "67+", label: "Schools" },
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

    const handleBtn = () => {
        navigate("/feedback-form");
    };

    const featureMouseMove = (e) => {
        for (const box of document.querySelectorAll(".feature-card")) {
            const rect = box.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            box.style.setProperty("--feat-mouse-x", `${x}px`);
            box.style.setProperty("--feat-mouse-y", `${y}px`);
        }
    };

    return (
        <div className="landing-page">
            <header className="fixed top-2.5 left-1/2 z-1000 flex h-max w-9/10 -translate-x-1/2 transform flex-col items-center justify-center overflow-hidden rounded-[30px] border-1 border-solid border-(--border) bg-[rgba(250_250_250_/_0.75)] backdrop-blur-xl">
                <nav className="flex h-(--header-height) w-full items-center justify-between overflow-hidden p-[7.5px]">
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

                    <button
                        className="hidden cursor-pointer rounded-full bg-gradient-to-br from-[#1976d2] to-[#42a5f5] px-6 py-2 font-semibold text-white transition-all duration-300 lg:inline-block"
                        onClick={handleBtn}
                    >
                        Get Started
                    </button>

                    <button
                        className="mobile-menu-btn block cursor-pointer border-0 bg-transparent text-[#2c3e50] hover:text-[#1976d2] lg:hidden"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? (
                            <X size={24} className="animate-in zoom-in" />
                        ) : (
                            <Menu size={24} className="animate-in zoom-in" />
                        )}
                    </button>
                </nav>
                <div
                    onClick={toggleMenu}
                    className={`lg:none flex flex-col items-center gap-1.5 overflow-hidden text-[#2c3e50] transition-all duration-280 ${isMenuOpen ? "h-max p-3" : "h-0 p-0"}`}
                >
                    <ul className="flex flex-col items-center justify-center gap-1.5 text-lg">
                        <li className="hover:text-[#1976d2]">
                            <HashLink smooth to="#features">
                                Features
                            </HashLink>
                        </li>
                        <li className="hover:text-[#1976d2]">
                            <HashLink smooth to="#about">
                                About
                            </HashLink>
                        </li>
                        <li className="hover:text-[#1976d2]">
                            <HashLink smooth to="#contact">
                                Contact
                            </HashLink>
                        </li>
                    </ul>
                    <button
                        onClick={handleBtn}
                        className="inline-flex transform cursor-pointer items-center gap-2 rounded-full bg-[linear-gradient(60deg,_#1976d2,_#42a5f5)] px-4 py-1.5 font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_25px_rgba(25,118,210,0.3)]"
                    >
                        Get Started
                    </button>
                </div>
            </header>

            <section className="hero overflow-hidden bg-inherit">
                <div className="hero-content fade-in bg-inherit">
                    <h1>
                        <span className="inline-flex flex-col text-black">
                            Transform{" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1412 136"
                                className="-mt-1.5 h-4"
                            >
                                <path
                                    d="M2.9 51.31c1.54 1.59 3.55 2.42 5.67 2.93 9.55 2.69 12.36 4.04 30.44 7.8-3 .3-5.73.44-8.57 3.08a9.83 9.83 0 0 0-2.07 10.92c.83 2.7 3.33 4.22 5.31 6.05 10.97 9.24 37.74 12.54 57.74 16.6 28.32 5.7 56.66 11.52 85.37 14.86 23.26 11.61 80.27 14.32 103.75 15.4 34.52 2.19 69.08 3.36 103.65 3.76 121.04 6.36 242.43.51 363.58.82 271.97-15.76 111.74-7.14 354.24-27.85 46.28-2.18 92.54-4.84 138.71-8.85 12.39-1.12 31.77-2.4 34.68-3.76 3.32-1.16 5.52-4.34 6.02-7.77 123.48-7.79 121.13-7.18 123.45-8.4 4.59-1.61 7.1-7.14 5.79-11.8a10.12 10.12 0 0 0-9.64-7.34c-46.89.01-33.59-2.78-103.06 3.46l10.94-1.87c1.99-.76 4.08-1.67 5.19-3.58 4.19-4.72 2.14-13.98-5.64-15.77-3.38-2.63-6.42-2-14.13-2.11-4.56-.7-9.13-1.34-13.72-1.81 34.64-5.34 46.49-8.03 55.99-12.31 2.43-1.11 4.63-2.64 6.94-3.97 14.45-7.01 3.34-24.98-8.18-18.36-2.71 1.43-5.2 3.25-7.94 4.62-11.02 4.17-22.83 5.68-34.36 7.85-36.51 6.23-65.21 9.47-105.27 13.24-39.97 3.44-79.94 7.17-120.01 9.1-112.89 6.65-225.89 10.72-338.92 13.94-139.42 4.28-72.29 2.74-238.74 3.83-152.12.02-105.22.84-209.3-3.14-24.84-.9-33.26-1.91-65.79-4.63-17.2-1.82-43.29-7.05-66.97-9.27-4.21-.16-8.68-1.39-12.64.37a9.33 9.33 0 0 0-5.97 7.81l-.03.26c-68.56-8.07-86.97-8.7-119.44-11.18a7.6 7.6 0 0 0-3.85.86 9.31 9.31 0 0 0-5.97 7.81c-.59 3.07.64 6.15 2.75 8.4Z"
                                    fill="#000"
                                ></path>
                            </svg>
                        </span>{" "}
                        <span className="bg-[radial-gradient(#42a5f5,_#1976d2)] bg-clip-text font-semibold text-transparent">
                            Student Feedback with AI-Powered Insights
                        </span>
                    </h1>
                    <p>
                        EDUPULSE revolutionizes how educators collect and analyze student feedback
                        using advanced sentiment analysis to improve teaching quality and student
                        satisfaction.
                    </p>
                </div>

                <div className="fade-in relative flex w-full items-center justify-center overflow-visible bg-inherit">
                    <img
                        src={heroImageLight2}
                        alt=""
                        className="aspect-4/1 max-w-[1000px] opacity-0 sm:aspect-2/1"
                    />
                    <div className="hero-img-cnt top-0 z-1 md:-left-4">
                        <img
                            src={heroImageLight1}
                            className="transition-all duration-350 hover:blur-none lg:blur-[1px]"
                        />
                    </div>
                    <div className="hero-img-cnt -right-20 -bottom-12 z-10 drop-shadow-[0_0_4em_#61dafbaa] md:-right-4 md:-bottom-32">
                        <img
                            src={heroImageLight2}
                            className="transition-all duration-350 hover:blur-none lg:blur-[1px]"
                        />
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

                    <div
                        className="features-grid grid grid-cols-1 gap-2 px-2 py-8 sm:grid-cols-2 lg:grid-cols-2 lg:px-8"
                        onMouseMove={featureMouseMove}
                    >
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="feature-card fade-in relative overflow-clip rounded-[10px] bg-[#fafafa] p-0.5 transition-all duration-300"
                            >
                                <div className={`feature-border absolute inset-0 z-1`}></div>
                                <div className="relative z-2 w-full rounded-[8px] bg-[#fafafa] p-8 text-center">
                                    <div className="feature-icon">{feature.icon}</div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats" id="about">
                <div className="stats-container">
                    {stats.map((stat, index) => {
                        const match = stat.number.match(/^(\d+)/);
                        const numericValue = match ? parseInt(match[1], 10) : null;
                        const suffix = match ? stat.number.slice(match[1].length) : stat.number;

                        return (
                            <div
                                key={index}
                                className="stat-item fade-in flex flex-col items-center"
                            >
                                <h3 className="flex items-center gap-2">
                                    {numericValue !== null ? (
                                        <>
                                            <ScrollOdometerLib
                                                value={numericValue}
                                                duration={900}
                                                format="(,ddd)" /* or whatever format you like */
                                            />
                                            {suffix}
                                        </>
                                    ) : (
                                        // fallback if there’s no leading number
                                        stat.number
                                    )}
                                </h3>
                                <p>{stat.label}</p>
                            </div>
                        );
                    })}
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
                        <p className="btn-secondary" onClick={handleBtn}>
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
                                <HashLink smooth to="#about">
                                    About
                                </HashLink>
                            </li>
                            <li>
                                <HashLink smooth to="#features">
                                    Features
                                </HashLink>
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
