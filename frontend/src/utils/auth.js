export const useAuth = () => {
    const getUser = () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    };

    const getToken = () => null;

    const setAuth = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        localStorage.removeItem("user");
    };

    return { getUser, getToken, setAuth, logout };
};
