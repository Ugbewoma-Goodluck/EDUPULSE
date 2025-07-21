import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase"; // ✅ FIXED path
import { LoaderCircle } from "lucide-react";

const PrivateRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading)
        return <span className="fixed top-[50%] left-[50%] translate-[-50%] animate-spin"><LoaderCircle size={50} /></span>;

    return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
