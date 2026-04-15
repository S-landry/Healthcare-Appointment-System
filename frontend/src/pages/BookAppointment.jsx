import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doctors, appointments } from "../utils/api";

export default function BookAppointment() {
    const navigate = useNavigate();
    const [doctorsList, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        doctorId: "",
        appointmentDate: "",
        reason: ""
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await doctors.getAll();
                setDoctors(data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await appointments.book(formData);
            alert("Appointment booked successfully!");
            navigate("/patient");
        } catch (error) {
            alert(error.response?.data?.error || "Booking failed");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-6 text-slate-900">Book an Appointment</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded border border-slate-200 space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Select Doctor</label>
                    <select
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-700"
                        value={formData.doctorId}
                        onChange={(e) => setFormData({...formData, doctorId: e.target.value})}
                        required
                    >
                        <option value="">Choose a doctor...</option>
                        {doctorsList.map(doc => (
                            <option key={doc.id} value={doc.id}>
                                Dr. {doc.User?.name} - {doc.specialization}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Appointment Date & Time</label>
                    <input
                        type="datetime-local"
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-700"
                        value={formData.appointmentDate}
                        onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Reason for Visit</label>
                    <textarea
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-700"
                        rows="4"
                        value={formData.reason}
                        onChange={(e) => setFormData({...formData, reason: e.target.value})}
                        placeholder="Describe your symptoms or reason for appointment..."
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2 bg-slate-700 text-white rounded hover:bg-slate-800 disabled:opacity-50 font-semibold"
                >
                    {submitting ? "Booking..." : "Book Appointment"}
                </button>
            </form>
        </div>
    );
}
