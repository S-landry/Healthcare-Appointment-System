import { useEffect, useState } from "react";
import { admin, doctors as doctorAPI } from "../utils/api";

export default function AdminDashboard() {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await admin.getStatistics();
                setStats(data);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-6 text-slate-900">Admin Dashboard</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded border border-slate-200">
                    <p className="text-sm text-slate-600">Total Patients</p>
                    <p className="text-3xl font-semibold text-slate-900">{stats.patientCount}</p>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200">
                    <p className="text-sm text-slate-600">Total Doctors</p>
                    <p className="text-3xl font-semibold text-slate-900">{stats.doctorCount}</p>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200">
                    <p className="text-sm text-slate-600">Total Appointments</p>
                    <p className="text-3xl font-semibold text-slate-900">{stats.appointmentCount}</p>
                </div>
                <div className="bg-white p-4 rounded border border-slate-200">
                    <p className="text-sm text-slate-600">Completed</p>
                    <p className="text-3xl font-semibold text-slate-900">{stats.completedCount}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="/admin/users" className="bg-white p-4 rounded border border-slate-200 hover:border-slate-400 cursor-pointer">
                    <h3 className="font-semibold text-slate-900">Manage Users</h3>
                    <p className="text-sm text-slate-600">View all users</p>
                </a>
                <a href="/admin/appointments" className="bg-white p-4 rounded border border-slate-200 hover:border-slate-400 cursor-pointer">
                    <h3 className="font-semibold text-slate-900">View Appointments</h3>
                    <p className="text-sm text-slate-600">All appointments</p>
                </a>
                <a href="/admin/create-doctor" className="bg-white p-4 rounded border border-slate-200 hover:border-slate-400 cursor-pointer">
                    <h3 className="font-semibold text-slate-900">Create Doctor</h3>
                    <p className="text-sm text-slate-600">Add new doctor</p>
                </a>
            </div>
        </div>
    );
}
