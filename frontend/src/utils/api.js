import axios from "axios";

const API = axios.create({ baseURL: "/api" });

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const auth = {
    register: (data) => API.post("/auth/register", data),
    login: (data) => API.post("/auth/login", data)
};

export const doctors = {
    getAll: () => API.get("/doctors"),
    getById: (id) => API.get(`/doctors/${id}`),
    create: (data) => API.post("/doctors/create", data),
    updateProfile: (data) => API.put("/doctors/profile", data)
};

export const appointments = {
    book: (data) => API.post("/appointments/book", data),
    getPatient: () => API.get("/appointments/patient"),
    getDoctor: () => API.get("/appointments/doctor"),
    updateStatus: (id, status) => API.put(`/appointments/${id}/status`, { status }),
    cancel: (id) => API.put(`/appointments/${id}/cancel`)
};

export const admin = {
    getUsers: () => API.get("/admin/users"),
    getAppointments: () => API.get("/admin/appointments"),
    getStatistics: () => API.get("/admin/statistics"),
    deleteUser: (id) => API.delete(`/admin/users/${id}`)
};

export default API;
