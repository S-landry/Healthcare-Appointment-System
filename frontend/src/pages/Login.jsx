import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/api";
import { useAuth } from "../utils/auth";

export default function Login() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await auth.login(formData);
            setAuth(data.token, data.user);
            navigate(data.user.role === "admin" ? "/admin" : data.user.role === "doctor" ? "/doctor" : "/patient");
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-semibold mb-6 text-slate-900">Login</h1>
                {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-700"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-700"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-slate-700 text-white rounded hover:bg-slate-800 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
