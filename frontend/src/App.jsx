import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import BookAppointment from "./pages/BookAppointment";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ViewAppointments from "./pages/ViewAppointments";
import CreateDoctor from "./pages/CreateDoctor";
import { ProtectedRoute } from "./utils/ProtectedRoute";

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="/patient" element={
                    <ProtectedRoute allowedRoles={["patient"]}>
                        <PatientDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/book-appointment" element={
                    <ProtectedRoute allowedRoles={["patient"]}>
                        <BookAppointment />
                    </ProtectedRoute>
                } />
                
                <Route path="/doctor" element={
                    <ProtectedRoute allowedRoles={["doctor"]}>
                        <DoctorDashboard />
                    </ProtectedRoute>
                } />
                
                <Route path="/admin" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <ManageUsers />
                    </ProtectedRoute>
                } />
                <Route path="/admin/appointments" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <ViewAppointments />
                    </ProtectedRoute>
                } />
                <Route path="/admin/create-doctor" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <CreateDoctor />
                    </ProtectedRoute>
                } />
                
                <Route path="/" element={<div className="max-w-6xl mx-auto p-8 text-center">
                    <h1 className="text-4xl font-semibold mb-4">Hospital Booking System</h1>
                    <p className="text-slate-600 mb-6">Book your appointments easily and efficiently</p>
                </div>} />
            </Routes>
        </Router>
    );
}
