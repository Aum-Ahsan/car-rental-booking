import { useState, useEffect } from 'react';
import { adminAPI, bookingsAPI } from '../../services/api';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { FaCalendarAlt, FaCar, FaUser, FaInfoCircle, FaSearch, FaFilter } from 'react-icons/fa';
import Loading from '../../components/common/Loading';
import { toast } from 'react-toastify';

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const { data } = await adminAPI.getAllBookings();
            setBookings(data.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await bookingsAPI.update(id, { status: newStatus });
            toast.success(`Booking ${newStatus} successfully`);
            setBookings(bookings.map(book =>
                book._id === id ? { ...book, status: newStatus } : book
            ));
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status');
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            booking.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.car?.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.car?.model?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                <div className="mb-8">
                    <h1 className="text-3xl font-display font-bold text-gray-900">Booking Management</h1>
                    <p className="text-gray-600">Review and update customer bookings</p>
                </div>

                {/* Filters Row */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by user or car..."
                            className="input pl-10 h-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="relative min-w-[150px]">
                            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                                className="input pl-10 h-10"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Booking ID / Date</th>
                                    <th className="px-6 py-4 font-semibold">User Details</th>
                                    <th className="px-6 py-4 font-semibold">Car Details</th>
                                    <th className="px-6 py-4 font-semibold">Rental Segment</th>
                                    <th className="px-6 py-4 font-semibold">Total</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                                            No bookings found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBookings.map((booking) => (
                                        <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="text-xs font-mono text-gray-400 truncate w-20" title={booking._id}>
                                                    #{booking._id.slice(-6)}
                                                </div>
                                                <div className="text-sm font-medium text-gray-900 mt-1">
                                                    {formatDate(booking.createdAt)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold">
                                                        {booking.user?.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 text-sm">{booking.user?.name}</div>
                                                        <div className="text-xs text-gray-500">{booking.user?.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                <div className="font-medium text-sm">{booking.car?.brand} {booking.car?.model}</div>
                                                <div className="text-xs text-gray-500">{booking.car?.category}</div>
                                            </td>
                                            <td className="px-6 py-4 text-xs">
                                                <div className="text-gray-600">
                                                    <span className="font-bold">Pick:</span> {formatDate(booking.pickupDate)}
                                                </div>
                                                <div className="text-gray-600 mt-1">
                                                    <span className="font-bold">Ret:</span> {formatDate(booking.returnDate)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-900">
                                                {formatCurrency(booking.totalPrice)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                                    ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                                                    ${booking.status === 'confirmed' ? 'bg-blue-100 text-blue-700' : ''}
                                                    ${booking.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                                                    ${booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
                                                `}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    className="text-xs border rounded p-1"
                                                    value={booking.status}
                                                    onChange={(e) => updateStatus(booking._id, e.target.value)}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingManagement;
