export const useAuth = () => {
    const getUser = () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    };

    const getToken = () => localStorage.getItem("token");

    const setAuth = (token, user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return { getUser, getToken, setAuth, logout };
};
