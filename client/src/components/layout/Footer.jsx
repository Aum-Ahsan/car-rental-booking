import { Link } from 'react-router-dom';
import { FaCar, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-2 rounded-xl">
                                <FaCar className="text-white text-2xl" />
                            </div>
                            <span className="text-2xl font-display font-bold">CarRental</span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Your trusted partner for car rentals. Find the perfect vehicle for your journey with competitive prices and excellent service.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-display font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/cars" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                                    Browse Cars
                                </Link>
                            </li>
                            <li>
                                <Link to="/my-bookings" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                                    My Bookings
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-xl font-display font-bold mb-6">Services</h3>
                        <ul className="space-y-3">
                            <li className="text-gray-400">Daily Rentals</li>
                            <li className="text-gray-400">Weekly Rentals</li>
                            <li className="text-gray-400">Monthly Rentals</li>
                            <li className="text-gray-400">Corporate Rentals</li>
                            <li className="text-gray-400">Airport Transfer</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-display font-bold mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <FaMapMarkerAlt className="text-primary-400 mt-1 flex-shrink-0" />
                                <span className="text-gray-400">123 Main Street, City, Country</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaPhone className="text-primary-400 flex-shrink-0" />
                                <span className="text-gray-400">+91 1234567890</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaEnvelope className="text-primary-400 flex-shrink-0" />
                                <span className="text-gray-400">info@carrental.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm mb-4 md:mb-0">
                            © {new Date().getFullYear()} CarRental. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
