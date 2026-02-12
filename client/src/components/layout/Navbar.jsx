import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaCar, FaBars, FaTimes, FaUser, FaSignOutAlt, FaCalendarAlt, FaTachometerAlt } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { isAuthenticated, user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setShowUserMenu(false);
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
            <div className="container-custom">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                            <FaCar className="text-white text-2xl" />
                        </div>
                        <span className="text-2xl font-display font-bold gradient-text hidden sm:block">
                            CarRental
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                        >
                            Home
                        </Link>
                        <Link
                            to="/cars"
                            className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                        >
                            Browse Cars
                        </Link>

                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 flex items-center justify-center text-white font-bold">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden lg:block">{user?.name}</span>
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 animate-scale-in">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                            <p className="text-xs text-gray-500 mt-1">{user?.email}</p>
                                        </div>

                                        {isAdmin && (
                                            <Link
                                                to="/admin/dashboard"
                                                onClick={() => setShowUserMenu(false)}
                                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                                            >
                                                <FaTachometerAlt />
                                                <span>Admin Dashboard</span>
                                            </Link>
                                        )}

                                        <Link
                                            to="/my-bookings"
                                            onClick={() => setShowUserMenu(false)}
                                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                                        >
                                            <FaCalendarAlt />
                                            <span>My Bookings</span>
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
                                        >
                                            <FaSignOutAlt />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="btn-outline px-5 py-2">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-primary px-5 py-2">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-700 hover:text-primary-600 transition-colors duration-200"
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100 animate-slide-down">
                        <div className="flex flex-col space-y-4">
                            <Link
                                to="/"
                                onClick={toggleMenu}
                                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                            >
                                Home
                            </Link>
                            <Link
                                to="/cars"
                                onClick={toggleMenu}
                                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                            >
                                Browse Cars
                            </Link>

                            {isAuthenticated ? (
                                <>
                                    {isAdmin && (
                                        <Link
                                            to="/admin/dashboard"
                                            onClick={toggleMenu}
                                            className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                                        >
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <Link
                                        to="/my-bookings"
                                        onClick={toggleMenu}
                                        className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                                    >
                                        My Bookings
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-left text-red-600 font-medium"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={toggleMenu} className="btn-outline">
                                        Login
                                    </Link>
                                    <Link to="/register" onClick={toggleMenu} className="btn-primary">
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
