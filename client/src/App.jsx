import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CarListing from './pages/CarListing';
import CarDetails from './pages/CarDetails';
import MyBookings from './pages/MyBookings';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import CarManagement from './pages/admin/CarManagement';
import CarForm from './pages/admin/CarForm';
import BookingManagement from './pages/admin/BookingManagement';
import UserManagement from './pages/admin/UserManagement';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cars" element={<CarListing />} />
              <Route path="/cars/:id" element={<CarDetails />} />

              {/* Protected User Routes */}
              <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />

              {/* Protected Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/cars" element={<ProtectedRoute adminOnly><CarManagement /></ProtectedRoute>} />
              <Route path="/admin/cars/add" element={<ProtectedRoute adminOnly><CarForm /></ProtectedRoute>} />
              <Route path="/admin/cars/edit/:id" element={<ProtectedRoute adminOnly><CarForm /></ProtectedRoute>} />
              <Route path="/admin/bookings" element={<ProtectedRoute adminOnly><BookingManagement /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute adminOnly><UserManagement /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
