const BASE_URL = "/api";

const request = async (path, options = {}) => {
    const response = await fetch(`${BASE_URL}${path}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        throw {
            response: {
                status: response.status,
                data
            }
        };
    }

    return { data };
};

export const auth = {
    register: (data) => request("/auth/register", { method: "POST", body: JSON.stringify(data) }),
    login: (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
    logout: () => request("/auth/logout", { method: "POST" })
};

export const doctors = {
    getAll: () => request("/doctors"),
    getById: (id) => request(`/doctors/${id}`),
    create: (data) => request("/doctors/create", { method: "POST", body: JSON.stringify(data) }),
    updateProfile: (data) => request("/doctors/profile", { method: "PUT", body: JSON.stringify(data) })
};

export const appointments = {
    book: (data) => request("/appointments/book", { method: "POST", body: JSON.stringify(data) }),
    getPatient: () => request("/appointments/patient"),
    getDoctor: () => request("/appointments/doctor"),
    updateStatus: (id, status) => request(`/appointments/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
    cancel: (id) => request(`/appointments/${id}/cancel`, { method: "PUT" })
};

export const admin = {
    getUsers: () => request("/admin/users"),
    getAppointments: () => request("/admin/appointments"),
    getStatistics: () => request("/admin/statistics"),
    deleteUser: (id) => request(`/admin/users/${id}`, { method: "DELETE" })
};

export default request;
