import "../assets/styles/login.css"; // Assuming you have a CSS file for styling
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ShadcnThemeContext";

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import logo from "../assets/ChatGPT Image Jul 10, 2025, 05_16_19 AM.png";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Monitor, Loader2, XCircle } from "lucide-react";

const Login = () => {
    const navigate = useNavigate();
    const { setTheme } = useTheme();
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });
    const [loginError, setLoginError] = useState("");
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError("");
        const { email, password } = login;

        if (!email || !password) {
            toast.warning("Please fill in all fields.");
            return;
        }

        setSending(true);

        const loginPromise = signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const userEmail = userCredential.user.email;
                if (userEmail === "edupulse360@gmail.com") {
                    setTimeout(() => navigate("/dashboard"), 200);
                } else {
                    setLoginError("Invalid Credentials");
                    throw new Error("Invalid Credentials");
                }
            })
            .catch((err) => {
                // this catches both Firebase auth errors AND your manual throw above
                setLoginError("Invalid Credentials");
                // toast.error("Login failed. Check your email & password.");
                throw err; // re‑throw so toast.promise sees a rejection
            });

        toast.promise(loginPromise, {
            loading: "Validating credentials...",
            success: "Welcome back!",
            error: "Login failed. Check your email & password.",
        });

        loginPromise.finally(() => {
            setLogin({ email: "", password: "" });
            setSending(false);
        });
    };

    const handlechange = (e) => {
        const { name, value } = e.target;
        setLogin((prev) => ({
            ...prev,
            [name]: value,
        }));
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
            <p className="greeting-block my-5 flex flex-col items-center">
                <span className="title w-[min(400px,_90%)] text-5xl font-bold">Admin Login</span>
            </p>

            <form onSubmit={handleSubmit}>
                <div className="input-wrap">
                    <label htmlFor="email">Email Address:</label>
                    <Input
                        type="email"
                        className="inp1"
                        placeholder="Email address"
                        name="email"
                        id="email"
                        value={login.email}
                        onChange={handlechange}
                    />
                </div>
                <div className="input-wrap">
                    <label htmlFor="password">Password:</label>
                    <Input
                        type="password"
                        className="inp2"
                        placeholder="Password"
                        name="password"
                        id="password"
                        value={login.password}
                        onChange={handlechange}
                    />
                </div>
                <div className="input-wrap">
                    <Button className="submit-btn" type="submit" disabled={sending}>
                        {sending ? (
                            <Loader2 className="aspect-square h-full animate-spin" />
                        ) : (
                            "Login"
                        )}
                    </Button>
                </div>
                <div className="input-wrap">
                    {loginError && (
                        <Alert variant="destructive">
                            <XCircle />
                            <AlertTitle className="font-bold">Error Logging in!</AlertTitle>
                            <AlertDescription>{loginError}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </form>
        </>
    );
};

export default Login;
