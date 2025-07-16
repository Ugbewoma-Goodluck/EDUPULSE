import "../assets/styles/student.css";
import { useState } from "react";
import axios from "axios";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useTheme } from "@/context/ShadcnThemeContext";

import logo from "../assets/ChatGPT Image Jul 10, 2025, 05_16_19 AM.png";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Monitor } from "lucide-react";

const Student = () => {
    const { setTheme } = useTheme();
    const [ssentiment, setsetimnet] = useState("");
    const [arr, setArr] = useState({
        C_code: "",
        lname: "",
    });
    const [sentimentMessage, setSentimentMessage] = useState("");
    const [loading, setloading] = useState(false);
    const [text, setText] = useState("");

    const handlechange = (e) => {
        const { name, value } = e.target;
        setSentimentMessage("");
        setArr((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const analyzeSentiment = async (text) => {
        const API_URL =
            "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment";
        const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

        try {
            const response = await toast.promise(
                axios.post(
                    API_URL,
                    { inputs: text },
                    {
                        headers: {
                            Authorization: `Bearer ${HF_TOKEN}`,
                            "Content-Type": "application/json",
                        },
                    },
                ),
                {
                    loading: "Analyzing sentiment...",
                    success: "Sentiment analyzed.",
                    error: "Error contacting sentiment server.",
                },
            );

            // Safeguard against API returning an error object
            if (!Array.isArray(response?.data?.[0])) {
                console.error("Unexpected response from sentiment API:", response.data);
                throw new Error("Unexpected sentiment data format");
            }

            const labelMap = {
                LABEL_0: "Negative",
                LABEL_1: "Neutral",
                LABEL_2: "Positive",
            };

            const top = response.data[0].reduce((a, b) => (a.score > b.score ? a : b));

            return labelMap[top.label] || "Unknown";
        } catch (err) {
            // Axios will throw for 401, 403, 500, etc.
            console.error("analyzeSentiment() failed:", {
                status: err.response?.status,
                message: err.message,
                data: err.response?.data,
            });

            throw new Error(
                "Sentiment analysis failed. Please check API token or try again later.",
            );
        }
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        if (!arr.C_code || !arr.lname || !text) {
            toast.warning("Please fill in all fields.");
            return;
        }

        setloading(true);
        setArr({ C_code: "", lname: "" });
        setText("");

        try {
            const sentiment = await analyzeSentiment(text);
            console.log("Final sentiment to be stored:", sentiment);

            await toast.promise(
                addDoc(collection(db, "feedback"), {
                    C_code: arr.C_code,
                    lname: arr.lname,
                    feedback: text,
                    sentiment,
                    createdAt: Timestamp.now(),
                }),
                {
                    loading: "Sending feedback...",
                    success: "Feedback sent—thanks for sharing!",
                    error: "Oops, couldn’t send feedback. Please retry.",
                },
            );

            // Optional: set sentiment-based message
            const messages = {
                Positive: "Thanks for sharing your honest opinion.",
                Neutral: "Thanks for your feedback. We’ll keep improving.",
                Negative: "Sorry to hear that. We'll work on making things better.",
            };

            setsetimnet(sentiment);
            setSentimentMessage(messages[sentiment] || "");
        } catch (error) {
            console.error("Full submission error:", error);
            setsetimnet("error");
            setSentimentMessage("");
        } finally {
            setloading(false);
        }
    };

    return (
        <>
            <header className="flex h-[50px] items-center justify-between px-2.5 py-2">
                <span className="flex h-full items-center gap-2.5">
                    <img src={logo} className="aspect-square h-full rounded-lg" alt="" />
                    <span className="text-2xl font-bold">
                        Edu<span className="text-pink-500 dark:text-pink-700">Pulse</span>
                    </span>
                </span>
                <span className="h-full">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="z-100" align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                <Sun />
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                <Moon />
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                <Monitor />
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </span>
            </header>

            <main>
                <p className="greeting-block my-5 flex flex-col items-center">
                    <span className="title w-[min(400px,_90%)] text-5xl font-bold">
                        HELLO STUDENT!
                    </span>
                    <span className="title w-[min(400px,_90%)] text-xl font-bold">
                        Tell us about your learning experience
                    </span>
                </p>
                <form onSubmit={handlesubmit}>
                    <div className="input-wrap">
                        <label>Course Name/Code:</label>
                        <Input
                            type="text"
                            value={arr.C_code}
                            onChange={(e) => handlechange(e)}
                            placeholder="Enter Course name/code...."
                            name="C_code"
                        />
                    </div>

                    <div className="input-wrap">
                        <label>Lecturer's name:</label>
                        <Input
                            type="text"
                            onChange={(e) => handlechange(e)}
                            value={arr.lname}
                            name="lname"
                            placeholder="Enter Lecturer name"
                        />
                    </div>

                    <div className="input-wrap">
                        <label>Feedback:</label>
                        <Textarea
                            id="textarea"
                            placeholder="Type your feedback here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <div className="input-wrap">
                        <Input
                            className="submit-btn"
                            type="submit"
                            value={loading ? "Submitting..." : "Submit"}
                            disabled={loading}
                        />
                    </div>
                </form>
            </main>
            {ssentiment && (
                <div
                    className={`message-box ${
                        ssentiment === "Positive"
                            ? "message-positive"
                            : ssentiment === "Negative"
                              ? "message-negative"
                              : "message-neutral"
                    }`}
                >
                    <p className="message">{sentimentMessage}</p>
                </div>
            )}
        </>
    );
};

export default Student;
