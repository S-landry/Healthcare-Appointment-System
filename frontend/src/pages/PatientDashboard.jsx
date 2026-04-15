import { useEffect, useState } from "react";
import { appointments, doctors } from "../utils/api";
import { formatDate, getStatusColor } from "../utils/helpers";

export default function PatientDashboard() {
    const [appointments_list, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await appointments.getPatient();
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const handleCancel = async (id) => {
        if (window.confirm("Cancel this appointment?")) {
            try {
                await appointments.cancel(id);
                setAppointments(appointments_list.filter(a => a.id !== id));
            } catch (error) {
                alert("Error cancelling appointment");
            }
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-slate-900">My Appointments</h1>
                <a href="/book-appointment" className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800">
                    Book Appointment
                </a>
            </div>

            {appointments_list.length === 0 ? (
                <div className="bg-slate-50 p-8 rounded text-center text-slate-600">
                    No appointments found. <a href="/book-appointment" className="text-slate-700 font-semibold">Book one now</a>
                </div>
            ) : (
                <div className="space-y-3">
                    {appointments_list.map((apt) => (
                        <div key={apt.id} className="bg-white p-4 rounded border border-slate-200 flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-slate-900">Dr. {apt.Doctor?.User?.name}</h3>
                                <p className="text-sm text-slate-600">{apt.Doctor?.specialization}</p>
                                <p className="text-sm text-slate-600">{formatDate(apt.appointmentDate)}</p>
                                <p className="text-sm text-slate-600">{apt.reason}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded text-sm ${getStatusColor(apt.status)}`}>
                                    {apt.status}
                                </span>
                                {apt.status !== "completed" && apt.status !== "cancelled" && (
                                    <button
                                        onClick={() => handleCancel(apt.id)}
                                        className="px-3 py-1 bg-red-50 text-red-700 rounded hover:bg-red-100 text-sm"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
