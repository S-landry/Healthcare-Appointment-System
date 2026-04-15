import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const navigate = useNavigate();
    const { getUser } = useAuth();
    const user = getUser();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
            navigate("/");
        }
    }, [user, navigate, allowedRoles]);

    if (!user) return null;
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) return null;

    return children;
};
