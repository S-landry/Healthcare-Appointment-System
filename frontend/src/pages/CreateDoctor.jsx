import { useState } from "react";
import { doctors as doctorAPI } from "../utils/api";

export default function CreateDoctor() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        specialization: ""
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await doctorAPI.create(formData);
            setSuccess("Doctor account created successfully!");
            setFormData({ name: "", email: "", password: "", phone: "", specialization: "" });
        } catch (err) {
            setError(err.response?.data?.error || "Failed to create doctor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-6 text-slate-900">Create Doctor Account</h1>

            {success && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded">{success}</div>}
            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded border border-slate-200 space-y-4">
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
                    type="text"
                    name="specialization"
                    placeholder="Specialization (e.g., Cardiologist)"
                    className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-700"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-slate-700 text-white rounded hover:bg-slate-800 disabled:opacity-50 font-semibold"
                >
                    {loading ? "Creating..." : "Create Doctor Account"}
                </button>
            </form>
        </div>
    );
}
