import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaShieldAlt, FaDollarSign, FaClock, FaStar, FaCheckCircle } from 'react-icons/fa';
import { carsAPI } from '../services/api';
import { formatCurrency } from '../utils/helpers';

const Home = () => {
    const [featuredCars, setFeaturedCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedCars();
    }, []);

    const fetchFeaturedCars = async () => {
        try {
            const { data } = await carsAPI.getAll({ availability: true });
            setFeaturedCars(data.data.slice(0, 3));
        } catch (error) {
            console.error('Error fetching cars:', error);
        } finally {
            setLoading(false);
        }
    };

    const features = [
        {
            icon: <FaCar className="text-4xl" />,
            title: 'Wide Selection',
            description: 'Choose from a diverse fleet of well-maintained vehicles for every need',
        },
        {
            icon: <FaShieldAlt className="text-4xl" />,
            title: 'Safe & Secure',
            description: 'All vehicles undergo regular maintenance and safety inspections',
        },
        {
            icon: <FaDollarSign className="text-4xl" />,
            title: 'Best Prices',
            description: 'Competitive pricing with no hidden charges or surprises',
        },
        {
            icon: <FaClock className="text-4xl" />,
            title: '24/7 Support',
            description: 'Round-the-clock customer support for your convenience',
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center bg-slate-900 text-white pt-20 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920"
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10"></div>

                <div className="container-custom relative z-20">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6 animate-fade-in">
                            <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                            Sri Lanka's #1 Car Rental Service
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-[1.1] animate-fade-in">
                            Experience the Road <br /> Like <span className="text-primary-500">Never Before</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-2xl animate-fade-in delay-100">
                            Explore the wonders of Sri Lanka with our premium fleet. From urban cruises to hill country adventures, find your perfect ride.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-200">
                            <Link to="/cars" className="btn-primary px-10 py-4 text-lg">
                                Explore Our Fleet
                            </Link>
                            <Link to="/register" className="btn-secondary px-10 py-4 text-lg">
                                Member Registration
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center gap-8 animate-fade-in delay-300">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 overflow-hidden bg-slate-800">
                                        <img src={`https://i.pravatar.cc/40?u=${i}`} alt="user" />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-primary-600 flex items-center justify-center text-xs font-bold">+1k</div>
                            </div>
                            <div className="text-sm text-slate-400">
                                <span className="text-white font-bold block">Trusted by 5,000+ Travelers</span>
                                4.9/5 Rating across Sri Lanka
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted Locations / Stats */}
            <div className="bg-slate-50 border-y border-slate-100 py-8">
                <div className="container-custom">
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-2xl font-display font-black text-slate-900">COLOMBO</span>
                        <span className="text-2xl font-display font-black text-slate-900">KANDY</span>
                        <span className="text-2xl font-display font-black text-slate-900">GALLE</span>
                        <span className="text-2xl font-display font-black text-slate-900">NEGOMBO</span>
                        <span className="text-2xl font-display font-black text-slate-900">JAFFNA</span>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section className="section bg-white overflow-hidden relative">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
                            Premium <span className="text-primary-600">Travel Experience</span>
                        </h2>
                        <p className="text-lg text-slate-600">Why thousands of Sri Lankans choose us for their journey</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="card group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500 shadow-inner">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Cars Section */}
            <section className="section bg-slate-50 border-t border-slate-100">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">
                                Our <span className="text-primary-600">Elite Fleet</span>
                            </h2>
                            <p className="text-lg text-slate-600">Curated selection of Sri Lanka's most reliable and luxury vehicles for every occasion.</p>
                        </div>
                        <Link to="/cars" className="btn-outline">
                            View Professional Catalog
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24">
                            <div className="w-12 h-12 border-4 border-slate-200 border-t-primary-600 rounded-full animate-spin"></div>
                            <p className="mt-4 text-slate-500 font-medium tracking-widest uppercase text-xs">Loading Catalog</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {featuredCars.map((car) => (
                                <div key={car._id} className="card-premium group">
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <img
                                            src={car.images[0]?.url || '/placeholder-car.jpg'}
                                            alt={`${car.brand} ${car.model}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4 z-10">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg ${car.availability ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                                                {car.availability ? 'Available Now' : 'Currently Booked'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                                            <span>{car.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                            <span>{car.year} Model</span>
                                        </div>
                                        <h3 className="text-2xl font-display font-bold text-slate-900 mb-6 group-hover:text-primary-600 transition-colors">
                                            {car.brand} {car.model}
                                        </h3>

                                        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                            <div>
                                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Price Per Day</p>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-2xl font-bold text-slate-900">
                                                        {formatCurrency(car.pricePerDay)}
                                                    </span>
                                                    <span className="text-slate-500 text-sm">/ day</span>
                                                </div>
                                            </div>
                                            <Link
                                                to={`/cars/${car._id}`}
                                                className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-900 hover:bg-primary-600 hover:border-primary-600 hover:text-white transition-all duration-300 shadow-sm"
                                            >
                                                <FaCar />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="section bg-white border-y border-slate-100">
                <div className="container-custom">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
                            Streamlined <span className="text-primary-600">Booking Process</span>
                        </h2>
                        <p className="text-lg text-slate-600">Your professional journey starts in three simple steps</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            { step: '01', title: 'Curate Choice', desc: 'Browse our professionally maintained fleet catalog.' },
                            { step: '02', title: 'Seamless Booking', desc: 'Secure your reservation with our elite check-out system.' },
                            { step: '03', title: 'Travel Experience', desc: 'Pick up your keys and experience Sri Lanka in style.' },
                        ].map((item, index) => (
                            <div key={index} className="relative">
                                {index < 2 && (
                                    <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[2px] bg-slate-100"></div>
                                )}
                                <div className="text-7xl font-display font-black text-slate-50 mb-6 absolute -top-10 left-0 -z-10">
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">{item.title}</h3>
                                <p className="text-slate-600 text-lg leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-600"></div>
                <div className="absolute inset-0 opacity-10">
                    <img
                        src="https://images.unsplash.com/photo-1549317661-bd348a54c2b1?auto=format&fit=crop&q=80&w=1920"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="container-custom relative z-10">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 md:p-20 text-center">
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
                            Ready for Your <br className="hidden md:block" /> Next Sri Lankan Adventure?
                        </h2>
                        <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Join over 5,000 satisfied members who enjoy exclusive rates and priority service across the island.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-slate-50 px-12 py-5 text-xl">
                                Become a Member
                            </Link>
                            <Link to="/cars" className="btn-outline border-white text-white hover:bg-white/10 px-12 py-5 text-xl">
                                Check Availability
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
