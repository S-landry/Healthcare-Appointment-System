export const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
};

export const getStatusColor = (status) => {
    const colors = {
        pending: "bg-amber-50 text-amber-700 border border-amber-200",
        confirmed: "bg-blue-50 text-blue-700 border border-blue-200",
        completed: "bg-green-50 text-green-700 border border-green-200",
        cancelled: "bg-red-50 text-red-700 border border-red-200"
    };
    return colors[status] || colors.pending;
};
