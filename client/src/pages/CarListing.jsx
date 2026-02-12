import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { carsAPI } from '../services/api';
import { formatCurrency } from '../utils/helpers';
import { FaSearch, FaFilter, FaStar, FaCar } from 'react-icons/fa';
import Loading from '../components/common/Loading';

const CarListing = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        location: '',
        availability: 'true',
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await carsAPI.getCategories();
                setCategories(data.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                const params = {};
                Object.keys(filters).forEach((key) => {
                    if (filters[key]) {
                        params[key] = filters[key];
                    }
                });

                const { data } = await carsAPI.getAll(params);
                setCars(data.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const resetFilters = () => {
        setFilters({
            search: '',
            category: '',
            minPrice: '',
            maxPrice: '',
            location: '',
            availability: 'true',
        });
    };

    return (
        <div className="min-h-screen py-12 bg-slate-50">
            <div className="container-custom">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-primary-600 font-bold uppercase tracking-wider text-sm mb-2">
                            <span className="w-8 h-[2px] bg-primary-600"></span>
                            Premium Fleet
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 leading-tight">
                            Explore Sri Lanka <br /> <span className="text-primary-600">In Comfort</span>
                        </h1>
                    </div>
                    <p className="text-lg text-slate-500 max-w-md">
                        Meticulously maintained vehicles for professional travel, tourism, and everyday elegance.
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                                <FaFilter />
                            </div>
                            Refine Your Search
                        </h2>
                        <button
                            onClick={resetFilters}
                            className="bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-lg text-slate-600 font-bold text-sm transition-colors"
                        >
                            Reset All Filters
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Search */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-900 uppercase tracking-widest ml-1">Keyword</label>
                            <div className="relative group">
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                                <input
                                    type="text" name="search"
                                    value={filters.search} onChange={handleFilterChange}
                                    placeholder="e.g. Toyota, Prius..."
                                    className="input pl-12"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-900 uppercase tracking-widest ml-1">Class</label>
                            <select
                                name="category"
                                value={filters.category} onChange={handleFilterChange}
                                className="input"
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-900 uppercase tracking-widest ml-1">Destination</label>
                            <input
                                type="text" name="location"
                                value={filters.location} onChange={handleFilterChange}
                                placeholder="Colombo, Kandy, Galle..."
                                className="input"
                            />
                        </div>

                        {/* Price Range */}
                        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-900 uppercase tracking-widest ml-1">Min Price (Rs.)</label>
                                <input
                                    type="number" name="minPrice"
                                    value={filters.minPrice} onChange={handleFilterChange}
                                    placeholder="5000" className="input"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-900 uppercase tracking-widest ml-1">Max Price (Rs.)</label>
                                <input
                                    type="number" name="maxPrice"
                                    value={filters.maxPrice} onChange={handleFilterChange}
                                    placeholder="50000" className="input"
                                />
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-900 uppercase tracking-widest ml-1">Status</label>
                            <select
                                name="availability"
                                value={filters.availability} onChange={handleFilterChange}
                                className="input"
                            >
                                <option value="">All Statuses</option>
                                <option value="true">Available Now</option>
                                <option value="false">Rented / Booked</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="mb-10 flex items-center justify-between px-2">
                    <p className="text-slate-500 font-medium">
                        Showing <span className="text-slate-900 font-bold">{cars.length}</span> signature vehicles
                    </p>
                </div>

                {loading ? (
                    <Loading />
                ) : cars.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-24 text-center border border-slate-100 shadow-sm">
                        <div className="w-24 h-24 bg-slate-50 text-slate-200 flex items-center justify-center rounded-3xl mx-auto mb-8">
                            <FaCar size={48} />
                        </div>
                        <h3 className="text-3xl font-display font-bold text-slate-900 mb-4">No matching vehicles</h3>
                        <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">We couldn't find any cars matching your precise filters. Try broadening your search or resetting all filters.</p>
                        <button onClick={resetFilters} className="btn-primary px-10">Clear Filter Grid</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {cars.map((car) => (
                            <div key={car._id} className="card-premium group">
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img
                                        src={car.images[0]?.url || 'https://placehold.co/800x600?text=Car+Image'}
                                        alt={`${car.brand} ${car.model}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/800x600?text=Car+Image';
                                        }}
                                    />
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[2px] backdrop-blur-md shadow-lg ${car.availability ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                                            {car.availability ? 'Ready to drive' : 'Reserved'}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 z-10">
                                        <span className="px-3 py-1 rounded-lg bg-white/90 text-slate-900 text-xs font-bold shadow-sm backdrop-blur-sm">
                                            {car.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[2px] mb-2">
                                        <span>{car.year} EDITION</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span>{car.fuelType}</span>
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-slate-900 mb-6 group-hover:text-primary-600 transition-colors">
                                        {car.brand} {car.model}
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-xs text-slate-400">
                                                <FaSearch className="rotate-90" size={12} />
                                            </div>
                                            <span className="text-sm font-bold">{car.transmission}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-xs text-slate-400">
                                                <FaStar size={12} />
                                            </div>
                                            <span className="text-sm font-bold">{car.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                        <div>
                                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[2px] mb-1">Daily Rate</p>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-display font-bold text-slate-900">
                                                    {formatCurrency(car.pricePerDay)}
                                                </span>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/cars/${car._id}`}
                                            className="btn-primary px-6 py-3 text-sm"
                                        >
                                            View Asset
                                        </Link>
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

export default CarListing;
