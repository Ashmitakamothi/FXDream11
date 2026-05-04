export const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "N/A";
    const dateObj = new Date(dateTimeStr);
    if (isNaN(dateObj)) return dateTimeStr;
    const options = { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return dateObj.toLocaleString("en-US", options);
};


export const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
};

