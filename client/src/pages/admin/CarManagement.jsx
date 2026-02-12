import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { carsAPI } from '../../services/api';
import { formatCurrency } from '../../utils/helpers';
import { FaPlus, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaSearch } from 'react-icons/fa';
import Loading from '../../components/common/Loading';
import { toast } from 'react-toastify';

const CarManagement = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const { data } = await carsAPI.getAll();
            setCars(data.data);
        } catch (error) {
            console.error('Error fetching cars:', error);
            toast.error('Failed to load cars');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this car?')) return;

        try {
            await carsAPI.delete(id);
            toast.success('Car deleted successfully');
            setCars(cars.filter(car => car._id !== id));
        } catch (error) {
            console.error('Error deleting car:', error);
            toast.error(error.response?.data?.message || 'Failed to delete car');
        }
    };

    const toggleAvailability = async (car) => {
        try {
            const { data } = await carsAPI.update(car._id, { availability: !car.availability });
            toast.success(`Car is now ${data.data.availability ? 'available' : 'unavailable'}`);
            setCars(cars.map(c => c._id === car._id ? data.data : c));
        } catch (error) {
            toast.error('Failed to update availability');
        }
    };

    const filteredCars = cars.filter(car =>
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-gray-900">Car Management</h1>
                        <p className="text-gray-600">Add, edit or remove cars from your fleet</p>
                    </div>
                    <Link to="/admin/cars/add" className="btn-primary flex items-center gap-2">
                        <FaPlus size={14} /> Add New Car
                    </Link>
                </div>

                {/* Filters Row */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search cars by brand, model or category..."
                            className="input pl-10 h-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center text-sm text-gray-500 whitespace-nowrap">
                        Showing {filteredCars.length} of {cars.length} cars
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Car</th>
                                    <th className="px-6 py-4 font-semibold">Category</th>
                                    <th className="px-6 py-4 font-semibold">Price/Day</th>
                                    <th className="px-6 py-4 font-semibold">Year</th>
                                    <th className="px-6 py-4 font-semibold">Availability</th>
                                    <th className="px-6 py-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredCars.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                                            No cars found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCars.map((car) => (
                                        <tr key={car._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-gray-900">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                                        <img
                                                            src={car.images?.[0]?.url || '/placeholder-car.jpg'}
                                                            alt={car.brand}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{car.brand} {car.model}</div>
                                                        <div className="text-xs text-gray-500">{car.location}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {car.category}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-primary-600">
                                                {formatCurrency(car.pricePerDay)}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {car.year}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                <button
                                                    onClick={() => toggleAvailability(car)}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                                                        ${car.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                                                    `}
                                                >
                                                    {car.availability ? <FaCheckCircle size={12} /> : <FaTimesCircle size={12} />}
                                                    {car.availability ? 'Available' : 'Booked'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Link
                                                        to={`/admin/cars/edit/${car._id}`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit Car"
                                                    >
                                                        <FaEdit size={16} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(car._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete Car"
                                                    >
                                                        <FaTrash size={16} />
                                                    </button>
                                                </div>
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

export default CarManagement;
