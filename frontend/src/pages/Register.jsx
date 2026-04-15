import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/api";
import { useAuth } from "../utils/auth";

export default function Register() {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        dob: "",
        gender: "male",
        address: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await auth.register(formData);
            setAuth(data.user);
            navigate("/patient");
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-slate-900">Patient Registration</h1>
                {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-700"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-700"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-700"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-700"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="dob"
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-700"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                    <select
                        name="gender"
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-700"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="Rather not say">Rather not say</option>
                        
                    </select>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-700"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-slate-700 text-white rounded hover:bg-slate-800 disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}
