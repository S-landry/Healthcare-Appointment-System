import { useEffect, useState } from "react";
import { admin } from "../utils/api";

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await admin.getUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Delete this user?")) {
            try {
                await admin.deleteUser(id);
                setUsers(users.filter(u => u.id !== id));
            } catch (error) {
                alert("Error deleting user");
            }
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-semibold mb-6 text-slate-900">Manage Users</h1>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead className="bg-slate-100 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-4 py-3 font-semibold text-slate-900">Name</th>
                            <th className="text-left px-4 py-3 font-semibold text-slate-900">Email</th>
                            <th className="text-left px-4 py-3 font-semibold text-slate-900">Phone</th>
                            <th className="text-left px-4 py-3 font-semibold text-slate-900">Role</th>
                            <th className="text-left px-4 py-3 font-semibold text-slate-900">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-slate-200 hover:bg-slate-50">
                                <td className="px-4 py-3 text-slate-900">{user.name}</td>
                                <td className="px-4 py-3 text-slate-600 text-sm">{user.email}</td>
                                <td className="px-4 py-3 text-slate-600 text-sm">{user.phone}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                        user.role === "admin" ? "bg-slate-200 text-slate-900" :
                                        user.role === "doctor" ? "bg-blue-100 text-blue-900" :
                                        "bg-green-100 text-green-900"
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="px-3 py-1 bg-red-50 text-red-700 rounded hover:bg-red-100 text-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
