import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";

export default function Navbar() {
    const navigate = useNavigate();
    const { getUser, logout } = useAuth();
    const user = getUser();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-semibold text-slate-900">
                    Hospital System
                </Link>

                <div className="flex gap-4 items-center">
                    {user ? (
                        <>
                            <span className="text-sm text-slate-600">{user.name}</span>
                            {user.role === "admin" && (
                                <Link to="/admin" className="text-slate-600 hover:text-slate-900">Admin</Link>
                            )}
                            {user.role === "doctor" && (
                                <Link to="/doctor" className="text-slate-600 hover:text-slate-900">Dashboard</Link>
                            )}
                            {user.role === "patient" && (
                                <Link to="/patient" className="text-slate-600 hover:text-slate-900">Dashboard</Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-slate-600 hover:text-slate-900">Login</Link>
                            <Link to="/register" className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
