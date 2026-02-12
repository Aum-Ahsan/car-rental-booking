// Format currency
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 0,
    }).format(amount);
};

// Format date
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-LK', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Format date for input
export const formatDateForInput = (date) => {
    return new Date(date).toISOString().split('T')[0];
};

// Calculate days between dates
export const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

// Validate email
export const isValidEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

// Validate phone
export const isValidPhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
};

// Get status badge color
export const getStatusColor = (status) => {
    const colors = {
        pending: 'badge-warning',
        confirmed: 'badge-info',
        completed: 'badge-success',
        cancelled: 'badge-danger',
        available: 'badge-success',
        unavailable: 'badge-danger',
    };
    return colors[status] || 'badge-info';
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// Convert file to base64
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

// Get initials from name
export const getInitials = (name) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
};
