import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookingsAPI } from '../services/api';
import { formatDate, formatCurrency, getStatusColor, calculateDays } from '../utils/helpers';
import { FaCar, FaCalendarAlt, FaMapMarkerAlt, FaTimes, FaCircleNotch } from 'react-icons/fa';
import Loading from '../components/common/Loading';
import { toast } from 'react-toastify';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelLoading, setCancelLoading] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const { data } = await bookingsAPI.getUserBookings();
            setBookings(data.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error('Failed to load your bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;

        setCancelLoading(id);
        try {
            await bookingsAPI.cancel(id);
            toast.success('Booking cancelled successfully');
            // Refresh list
            fetchBookings();
        } catch (error) {
            const msg = error.response?.data?.message || 'Cancellation failed';
            toast.error(msg);
        } finally {
            setCancelLoading(null);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">No bookings yet</h3>
                        <p className="text-gray-600 mb-6">You haven't booked any cars yet.</p>
                        <Link to="/cars" className="btn-primary">Browse Cars</Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Car Image */}
                                    <div className="md:w-1/4 h-48 md:h-auto bg-gray-100 relative">
                                        <img
                                            src={booking.car?.images?.[0]?.url || '/placeholder-car.jpg'}
                                            alt={booking.car?.brand}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className={`badge ${getStatusColor(booking.status)} uppercase text-xs tracking-wider shadow-sm`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Booking Details */}
                                    <div className="p-6 md:w-3/4 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">
                                                        {booking.car?.brand} {booking.car?.model}
                                                    </h3>
                                                    <p className="text-gray-500 text-sm">{booking.car?.category}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-primary-600">
                                                        {formatCurrency(booking.totalPrice)}
                                                    </p>
                                                    <p className="text-xs text-gray-500">Total Price</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <div className="flex items-center text-gray-600">
                                                    <FaCalendarAlt className="mr-3 text-primary-500" />
                                                    <div>
                                                        <p className="text-xs text-gray-400 uppercase">Dates</p>
                                                        <p className="font-medium">
                                                            {formatDate(booking.pickupDate)} - {formatDate(booking.returnDate)}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            ({calculateDays(booking.pickupDate, booking.returnDate)} Days)
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center text-gray-600">
                                                    <FaMapMarkerAlt className="mr-3 text-primary-500" />
                                                    <div>
                                                        <p className="text-xs text-gray-400 uppercase">Pickup Location</p>
                                                        <p className="font-medium">{booking.pickupLocation}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                            <p className="text-xs text-gray-400">
                                                Booked on {formatDate(booking.createdAt)}
                                            </p>

                                            <div className="space-x-3">
                                                <Link
                                                    to={`/cars/${booking.car?._id}`}
                                                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                                                >
                                                    View Car
                                                </Link>

                                                {booking.status === 'pending' || booking.status === 'confirmed' ? (
                                                    <button
                                                        onClick={() => handleCancel(booking._id)}
                                                        disabled={cancelLoading === booking._id}
                                                        className="text-red-500 hover:text-red-700 font-medium text-sm inline-flex items-center"
                                                    >
                                                        {cancelLoading === booking._id ? (
                                                            <FaCircleNotch className="animate-spin mr-1" />
                                                        ) : (
                                                            <FaTimes className="mr-1" />
                                                        )}
                                                        Cancel Booking
                                                    </button>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
