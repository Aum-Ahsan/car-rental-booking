import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/helpers';
import {
    FaCar, FaUsers, FaCalendarCheck, FaMoneyBillWave,
    FaArrowRight, FaClock, FaCheckCircle, FaTimesCircle
} from 'react-icons/fa';
import Loading from '../../components/common/Loading';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const { data } = await adminAPI.getStats();
            setStats(data.data);
        } catch (error) {
            console.error('Error fetching admin stats:', error);
            toast.error('Failed to load dashboard statistics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;
    if (!stats) return <div className="text-center py-20 text-red-500">Failed to load statistics.</div>;

    const { overview, bookingStatus, recentBookings } = stats;

    const cards = [
        {
            title: 'Total Users',
            value: overview.totalUsers,
            icon: <FaUsers className="text-blue-500" />,
            bgColor: 'bg-blue-50'
        },
        {
            title: 'Total Cars',
            value: overview.totalCars,
            icon: <FaCar className="text-purple-500" />,
            bgColor: 'bg-purple-50'
        },
        {
            title: 'Total Bookings',
            value: overview.totalBookings,
            icon: <FaCalendarCheck className="text-green-500" />,
            bgColor: 'bg-green-50'
        },
        {
            title: 'Total Revenue',
            value: formatCurrency(overview.totalRevenue),
            icon: <FaMoneyBillWave className="text-amber-500" />,
            bgColor: 'bg-amber-50'
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-600">Overview of your car rental business</p>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/admin/cars" className="btn-primary">Manage Cars</Link>
                        <Link to="/admin/bookings" className="btn-outline">Manage Bookings</Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {cards.map((card, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className={`${card.bgColor} p-4 rounded-xl text-2xl`}>
                                {card.icon}
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Booking Status breakdown */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Status</h3>
                        <div className="space-y-4">
                            <StatusItem label="Pending" count={bookingStatus.pending} color="text-yellow-600" bgColor="bg-yellow-100" />
                            <StatusItem label="Confirmed" count={bookingStatus.confirmed} color="text-blue-600" bgColor="bg-blue-100" />
                            <StatusItem label="Completed" count={bookingStatus.completed} color="text-green-600" bgColor="bg-green-100" />
                            <StatusItem label="Cancelled" count={bookingStatus.cancelled} color="text-red-600" bgColor="bg-red-100" />
                        </div>
                    </div>

                    {/* Recent Bookings */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
                            <Link to="/admin/bookings" className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center gap-1">
                                View All <FaArrowRight size={12} />
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">User</th>
                                        <th className="px-6 py-4 font-semibold">Car</th>
                                        <th className="px-6 py-4 font-semibold">Date</th>
                                        <th className="px-6 py-4 font-semibold">Amount</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentBookings.map((booking) => (
                                        <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{booking.user?.name}</div>
                                                <div className="text-xs text-gray-500">{booking.user?.email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {booking.car?.brand} {booking.car?.model}
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-sm">
                                                {formatDate(booking.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-900">
                                                {formatCurrency(booking.totalPrice)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                                                    ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                                                    ${booking.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : ''}
                                                    ${booking.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                                                    ${booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
                                                `}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatusItem = ({ label, count, color, bgColor }) => (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${bgColor.replace('bg-', 'bg-').replace('100', '500')}`}></div>
            <span className="font-medium text-gray-700">{label}</span>
        </div>
        <span className={`font-bold ${color}`}>{count}</span>
    </div>
);

export default AdminDashboard;
