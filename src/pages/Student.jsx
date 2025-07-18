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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Monitor, Smile, Loader2 } from "lucide-react";

const Student = () => {
    const { setTheme } = useTheme();

    const [sentiment, setSentiment] = useState("");
    const [arr, setArr] = useState({ C_code: "", lname: "" });
    const [sentimentMessage, setSentimentMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSentimentMessage("");
        setArr((prev) => ({ ...prev, [name]: value }));
    };

    const analyzeSentiment = async (text) => {
        const API_URL =
            "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment";
        const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
        if (!HF_TOKEN) throw new Error("Missing Hugging Face token (check your .env)");

        const { data, status } = await axios.post(
            API_URL,
            { inputs: text, options: { wait_for_model: true } },
            {
                headers: {
                    Authorization: `Bearer ${HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                timeout: 15000,
            },
        );

        if (status === 401) {
            console.error("HF auth failed:", data);
            throw new Error("Hugging Face rejected your token (401)");
        }
        if (data.error) {
            console.error("HF API error:", data.error);
            throw new Error(data.error);
        }
        if (!Array.isArray(data) || !Array.isArray(data[0])) {
            console.error("Unexpected HF response:", data);
            throw new Error("Unexpected response format");
        }

        const labelMap = { LABEL_0: "Negative", LABEL_1: "Neutral", LABEL_2: "Positive" };
        const top = data[0].reduce((a, b) => (a.score > b.score ? a : b));
        return labelMap[top.label] || "Unknown";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSentimentMessage("");

        if (!arr.C_code || !arr.lname || !text) {
            toast.warning("Please fill in all fields.");
            return;
        }

        setLoading(true);

        // 1️⃣ Build the promise that does HF + Firestore
        const feedbackPromise = (async () => {
            const result = await analyzeSentiment(text);
            await addDoc(collection(db, "feedback"), {
                C_code: arr.C_code,
                lname: arr.lname,
                feedback: text,
                sentiment: result,
                createdAt: Timestamp.now(),
            });
            return result;
        })();

        // 2️⃣ Attach your toast to it
        toast.promise(feedbackPromise, {
            loading: "Submitting feedback…",
            success: (result) => {
                setArr({ C_code: "", lname: "" });
                setText("");
                setSentiment(result);

                const messages = {
                    Positive: "Thanks for sharing your honest opinion.",
                    Neutral: "Thanks for your feedback. We’ll keep improving.",
                    Negative: "Sorry to hear that. We'll work on making things better.",
                };
                return messages[result] || "Feedback sent—thanks!";
            },
            error: (err) => {
                console.error("Submission error:", err);
                return err.message || "Submission failed. Please try again.";
            },
        });

        // 3️⃣ Always re-enable the button when done
        feedbackPromise.finally(() => {
            setLoading(false);
        });
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
                                <Sun /> Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                <Moon /> Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                <Monitor /> System
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
                <form onSubmit={handleSubmit}>
                    <div className="input-wrap">
                        <label>Course Name/Code:</label>
                        <Input
                            type="text"
                            value={arr.C_code}
                            onChange={handleChange}
                            placeholder="Enter Course name/code...."
                            name="C_code"
                        />
                    </div>

                    <div className="input-wrap">
                        <label>Lecturer's name:</label>
                        <Input
                            type="text"
                            value={arr.lname}
                            onChange={handleChange}
                            name="lname"
                            placeholder="Enter Lecturer name"
                        />
                    </div>

                    <div className="input-wrap">
                        <label>Feedback:</label>
                        <Textarea
                            rows={4}
                            id="textarea"
                            placeholder="Type your feedback here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <div className="input-wrap">
                        <Button className="submit-btn" type="submit" disabled={loading}>
                            {loading ? (
                                <Loader2 className="aspect-square h-full animate-spin" />
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </div>
                </form>
            </main>

            {sentiment && (
                <div className="input-wrap">
                    <Alert
                        className={`border-1 bg-${sentiment.toLocaleLowerCase()} text-${sentiment.toLocaleLowerCase()}-foreground border-bg-${sentiment.toLocaleLowerCase()}-border`}
                    >
                        {sentiment === "Positive" ? (
                            <Smile />
                        ) : sentiment === "Negative" ? (
                            <Frown />
                        ) : (
                            <Meh />
                        )}
                        <AlertDescription>{sentimentMessage}</AlertDescription>
                    </Alert>
                </div>
            )}
        </>
    );
};

export default Student;
