import { useEffect, useState } from "react";
import { admin } from "../utils/api";
import { formatDate, getStatusColor } from "../utils/helpers";

export default function ViewAppointments() {
    const [appointmentsList, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await admin.getAppointments();
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-6 text-slate-900">All Appointments</h1>

            {appointmentsList.length === 0 ? (
                <div className="bg-slate-50 p-8 rounded text-center text-slate-600">
                    No appointments found
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-slate-100 border-b border-slate-200">
                            <tr>
                                <th className="text-left px-4 py-3 font-semibold text-slate-900">Date/Time</th>
                                <th className="text-left px-4 py-3 font-semibold text-slate-900">Doctor</th>
                                <th className="text-left px-4 py-3 font-semibold text-slate-900">Patient</th>
                                <th className="text-left px-4 py-3 font-semibold text-slate-900">Reason</th>
                                <th className="text-left px-4 py-3 font-semibold text-slate-900">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointmentsList.map(apt => (
                                <tr key={apt.id} className="border-b border-slate-200 hover:bg-slate-50">
                                    <td className="px-4 py-3 text-sm text-slate-900">{formatDate(apt.appointmentDate)}</td>
                                    <td className="px-4 py-3 text-sm text-slate-900">Dr. {apt.Doctor?.User?.name}</td>
                                    <td className="px-4 py-3 text-sm text-slate-900">{apt.Patient?.User?.name}</td>
                                    <td className="px-4 py-3 text-sm text-slate-600">{apt.reason}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(apt.status)}`}>
                                            {apt.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
