import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { carsAPI, bookingsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, calculateDays, formatDateForInput } from '../utils/helpers';
import { FaCar, FaGasPump, FaCogs, FaChair, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaArrowLeft } from 'react-icons/fa';
import Loading from '../components/common/Loading';
import { toast } from 'react-toastify';

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [bookingLoading, setBookingLoading] = useState(false);

    // Booking Form State
    const [bookingData, setBookingData] = useState({
        pickupLocation: '',
        pickupDate: '',
        returnDate: '',
        notes: ''
    });

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const { data } = await carsAPI.getById(id);
                setCar(data.data);
                // Set default pickup location to car location
                setBookingData(prev => ({ ...prev, pickupLocation: data.data.location }));
            } catch (error) {
                console.error('Error fetching car details:', error);
                toast.error('Failed to load car details');
                navigate('/cars');
            } finally {
                setLoading(false);
            }
        };

        fetchCarDetails();
    }, [id, navigate]);

    useEffect(() => {
        if (car && bookingData.pickupDate && bookingData.returnDate) {
            const days = calculateDays(bookingData.pickupDate, bookingData.returnDate);
            if (days > 0) {
                setTotalPrice(days * car.pricePerDay);
            } else {
                setTotalPrice(0);
            }
        }
    }, [bookingData.pickupDate, bookingData.returnDate, car]);

    const handleInputChange = (e) => {
        setBookingData({
            ...bookingData,
            [e.target.name]: e.target.value
        });
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            toast.info('Please login to book a car');
            navigate('/login', { state: { from: `/cars/${id}` } });
            return;
        }

        // Validation
        if (!bookingData.pickupDate || !bookingData.returnDate) {
            toast.error('Please select valid dates');
            return;
        }

        const start = new Date(bookingData.pickupDate);
        const end = new Date(bookingData.returnDate);

        if (start >= end) {
            toast.error('Return date must be after pickup date');
            return;
        }

        // Check if pickup date is in the past (using string comparison to avoid timezone issues)
        const todayStr = new Date().toISOString().split('T')[0];

        if (bookingData.pickupDate < todayStr) {
            toast.error('Pickup date cannot be in the past');
            return;
        }

        setBookingLoading(true);

        try {
            const response = await bookingsAPI.create({
                car: car._id,
                ...bookingData
            });

            if (response.data.success) {
                toast.success('Booking requested successfully!');
                navigate('/my-bookings');
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Booking failed';
            toast.error(msg);
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return <Loading fullScreen />;
    if (!car) return <div className="text-center py-20">Car not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                {/* Back Button */}
                <Link to="/cars" className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors">
                    <FaArrowLeft className="mr-2" /> Back to listings
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Images & Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="relative h-[400px] bg-gray-100">
                                <img
                                    src={car.images[activeImage]?.url || 'https://placehold.co/600x400?text=Car+Image'}
                                    alt={`${car.brand} ${car.model}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://placehold.co/600x400?text=Car+Image';
                                    }}
                                />
                                <div className="absolute top-4 right-4 animate-fade-in">
                                    <span className={`badge ${car.availability ? 'badge-success' : 'badge-danger'} px-4 py-2 text-base`}>
                                        {car.availability ? 'Available Now' : 'Currently Unavailable'}
                                    </span>
                                </div>
                            </div>

                            {/* Thumbnails */}
                            {car.images.length > 1 && (
                                <div className="flex p-4 gap-4 overflow-x-auto">
                                    {car.images.map((img, idx) => (
                                        <button
                                            key={img.fileId || idx}
                                            onClick={() => setActiveImage(idx)}
                                            className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                                                }`}
                                        >
                                            <img src={img.url} alt="thumbnail" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Car Info */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <div>
                                    <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                                        {car.brand} {car.model}
                                    </h1>
                                    <p className="text-lg text-gray-500">{car.category} • {car.year}</p>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                    <p className="text-3xl font-bold gradient-text">{formatCurrency(car.pricePerDay)}</p>
                                    <p className="text-gray-500">per day</p>
                                </div>
                            </div>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 py-6 border-y border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                                        <FaCogs size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Transmission</p>
                                        <p className="font-medium text-gray-900">{car.transmission}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                        <FaGasPump size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Fuel Type</p>
                                        <p className="font-medium text-gray-900">{car.fuelType}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                                        <FaChair size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Seats</p>
                                        <p className="font-medium text-gray-900">{car.seats} Persons</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
                                        <FaMapMarkerAlt size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-semibold">Location</p>
                                        <p className="font-medium text-gray-900">{car.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description & Features */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Description</h3>
                                    <p className="text-gray-600 leading-relaxed">{car.description}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {car.features.map((feature, index) => (
                                            <div key={index} className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                                                <FaCheck className="text-green-500 mr-2" size={12} />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24">
                            <h2 className="text-2xl font-display font-bold mb-6 flex items-center">
                                <FaCalendarAlt className="mr-2 text-primary-600" />
                                Book This Car
                            </h2>

                            <form onSubmit={handleBookingSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute left-3 top-3.5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="pickupLocation"
                                            required
                                            value={bookingData.pickupLocation}
                                            onChange={handleInputChange}
                                            className="input pl-10"
                                            placeholder="Enter pickup address"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                                        <input
                                            type="date"
                                            name="pickupDate"
                                            required
                                            min={formatDateForInput(new Date())}
                                            value={bookingData.pickupDate}
                                            onChange={handleInputChange}
                                            className="input"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                                        <input
                                            type="date"
                                            name="returnDate"
                                            required
                                            min={bookingData.pickupDate || formatDateForInput(new Date())}
                                            value={bookingData.returnDate}
                                            onChange={handleInputChange}
                                            className="input"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
                                    <textarea
                                        name="notes"
                                        rows="3"
                                        value={bookingData.notes}
                                        onChange={handleInputChange}
                                        className="input"
                                        placeholder="Any special requests..."
                                    ></textarea>
                                </div>

                                {/* Price Summary */}
                                {totalPrice > 0 && (
                                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 animate-slide-up">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600">Rate per day</span>
                                            <span className="font-medium">{formatCurrency(car.pricePerDay)}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600">Duration</span>
                                            <span className="font-medium">{calculateDays(bookingData.pickupDate, bookingData.returnDate)} Days</span>
                                        </div>
                                        <div className="border-t border-blue-200 mt-2 pt-2 flex justify-between items-center">
                                            <span className="font-bold text-lg text-blue-900">Total</span>
                                            <span className="font-bold text-xl text-primary-600">{formatCurrency(totalPrice)}</span>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={bookingLoading || !car.availability}
                                    className={`w-full py-4 text-lg font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 ${car.availability
                                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-primary-500/30'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    {bookingLoading ? (
                                        <span className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                            Processing...
                                        </span>
                                    ) : !car.availability ? (
                                        'Not Available'
                                    ) : (
                                        `Book Now • ${totalPrice > 0 ? formatCurrency(totalPrice) : formatCurrency(car.pricePerDay) + '/day'}`
                                    )}
                                </button>
                            </form>

                            {!isAuthenticated && (
                                <p className="text-sm text-center text-gray-500 mt-4">
                                    You need to <Link to="/login" className="text-primary-600 font-semibold">Login</Link> to make a booking
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
