import { useEffect, useState } from "react";
import { appointments } from "../utils/api";
import { formatDate, getStatusColor } from "../utils/helpers";

export default function DoctorDashboard() {
    const [appointmentsList, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await appointments.getDoctor();
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await appointments.updateStatus(id, newStatus);
            setAppointments(appointmentsList.map(a => 
                a.id === id ? { ...a, status: newStatus } : a
            ));
        } catch (error) {
            alert("Error updating appointment");
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;

    const pending = appointmentsList.filter(a => a.status === "pending").length;
    const confirmed = appointmentsList.filter(a => a.status === "confirmed").length;
    const completed = appointmentsList.filter(a => a.status === "completed").length;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-6 text-slate-900">My Appointments</h1>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded border border-slate-200">
                    <p className="text-sm text-slate-600">Pending</p>
                    <p className="text-2xl font-semibold text-slate-900">{pending}</p>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200">
                    <p className="text-sm text-slate-600">Confirmed</p>
                    <p className="text-2xl font-semibold text-slate-900">{confirmed}</p>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200">
                    <p className="text-sm text-slate-600">Completed</p>
                    <p className="text-2xl font-semibold text-slate-900">{completed}</p>
                </div>
            </div>

            {appointmentsList.length === 0 ? (
                <div className="bg-slate-50 p-8 rounded text-center text-slate-600">
                    No appointments scheduled
                </div>
            ) : (
                <div className="space-y-3">
                    {appointmentsList.map((apt) => (
                        <div key={apt.id} className="bg-white p-4 rounded border border-slate-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-slate-900">{apt.Patient?.User?.name}</h3>
                                    <p className="text-sm text-slate-600">Phone: {apt.Patient?.User?.phone}</p>
                                    <p className="text-sm text-slate-600">{formatDate(apt.appointmentDate)}</p>
                                    <p className="text-sm text-slate-600 mt-2">Reason: {apt.reason}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={apt.status}
                                        onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                                        className={`px-3 py-1 rounded text-sm border ${getStatusColor(apt.status)}`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
