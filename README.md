# 🚗 Car Rental Booking Website - Full Stack MERN Application

A production-ready, full-stack car rental booking platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application provides a seamless experience for users to browse, book, and manage car rentals, while offering administrators powerful tools to manage inventory, bookings, and users.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

## ✨ Features

### User Features
- ✅ **User Authentication**: Secure registration and login with JWT
- ✅ **Car Browsing**: Browse available cars with advanced filtering (category, price, location, availability)
- ✅ **Search Functionality**: Search cars by brand, model, or description
- ✅ **Car Details**: View comprehensive car information with image galleries
- ✅ **Online Booking**: Book cars with pickup location and date selection
- ✅ **Booking Management**: View and cancel bookings
- ✅ **Real-time Availability**: See live availability status
- ✅ **Responsive Design**: Fully responsive UI works on all devices

### Admin Features
- ✅ **Admin Dashboard**: Comprehensive statistics and analytics
- ✅ **Car Management**: Add, edit, and delete car listings
- ✅ **Image Upload**: ImageKit integration for optimized image storage
- ✅ **Booking Oversight**: View and manage all bookings
- ✅ **User Management**: View users and manage roles
- ✅ **Revenue Analytics**: Track earnings and booking trends

### Technical Features
- ✅ **RESTful API**: Well-structured API endpoints
- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **MongoDB**: Persistent data storage with Mongoose ODM
- ✅ **ImageKit Integration**: Optimized image delivery
- ✅ **Input Validation**: Comprehensive validation and error handling
- ✅ **Modern UI/UX**: Tailwind CSS with glassmorphism and animations
- ✅ **Cloud Ready**: Deployment-ready for production

## 🏗️ Project Structure

```
car-rental-booking/
├── client/                     # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/        # Reusable components
│   │   │   ├── layout/        # Layout components (Navbar, Footer)
│   │   │   ├── cars/          # Car-related components
│   │   │   ├── booking/       # Booking components
│   │   │   └── admin/         # Admin components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React Context (Auth)
│   │   ├── services/          # API services
│   │   ├── utils/             # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                     # Node.js Backend
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── imagekit.js        # ImageKit configuration
│   ├── models/
│   │   ├── User.js
│   │   ├── Car.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── car.routes.js
│   │   ├── booking.routes.js
│   │   └── admin.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── car.controller.js
│   │   ├── booking.controller.js
│   │   └── admin.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **ImageKit** account (for image storage)
- **npm** or **yarn**

### Installation

#### 1. Clone the repository
```bash
git clone <repository-url>
cd car-rental-booking
```

#### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/car-rental
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
NODE_ENV=development
```

#### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

#### Start the Backend Server

```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`

#### Start the Frontend

```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/me` | Get current user | Yes |

### Car Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/cars` | Get all cars (with filters) | No |
| GET | `/cars/:id` | Get single car | No |
| GET | `/cars/categories/all` | Get all categories | No |
| POST | `/cars` | Create car | Admin |
| PUT | `/cars/:id` | Update car | Admin |
| DELETE | `/cars/:id` | Delete car | Admin |

### Booking Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/bookings` | Get user's bookings | Yes |
| GET | `/bookings/:id` | Get single booking | Yes |
| POST | `/bookings` | Create booking | Yes |
| PUT | `/bookings/:id` | Update booking | Yes |
| DELETE | `/bookings/:id` | Cancel booking | Yes |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/stats` | Get dashboard statistics | Admin |
| GET | `/admin/users` | Get all users | Admin |
| GET | `/admin/bookings` | Get all bookings | Admin |
| DELETE | `/admin/users/:id` | Delete user | Admin |
| PUT | `/admin/users/:id/role` | Update user role | Admin |

## 🎨 UI/UX Features

- **Modern Design**: Clean, intuitive interface with Tailwind CSS
- **Glassmorphism Effects**: Premium frosted glass design elements
- **Smooth Animations**: Engaging micro-interactions and transitions
- **Responsive Layout**: Mobile-first design that works on all screen sizes
- **Custom Color Palette**: Vibrant gradients and harmonious colors
- **Typography**: Google Fonts (Inter, Outfit) for better readability
- **Loading States**: Elegant loading indicators
- **Toast Notifications**: User-friendly feedback messages

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password encryption
- **Input Validation**: Server-side and client-side validation
- **Protected Routes**: Role-based access control
- **CORS Configuration**: Controlled cross-origin requests
- **Error Handling**: Comprehensive error management

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (enum: ['user', 'admin']),
  createdAt: Date
}
```

### Car Model
```javascript
{
  brand: String,
  model: String,
  category: String,
  year: Number,
  pricePerDay: Number,
  features: [String],
  fuelType: String,
  transmission: String,
  seats: Number,
  availability: Boolean,
  images: [{ url: String, fileId: String }],
  location: String,
  description: String,
  createdAt: Date
}
```

### Booking Model
```javascript
{
  user: ObjectId (ref: User),
  car: ObjectId (ref: Car),
  pickupLocation: String,
  pickupDate: Date,
  returnDate: Date,
  totalPrice: Number,
  status: String (enum: ['pending', 'confirmed', 'completed', 'cancelled']),
  paymentStatus: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🌐 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. Create a new project on your chosen platform
2. Connect your repository
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables
4. Configure API URL

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Configure network access
4. Get connection string
5. Update `MONGODB_URI` in backend `.env`

## 🧪 Testing

### Test User Credentials

After registration, create an admin user manually in MongoDB:

Update a user document:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 📝 Environment Variables

### Backend

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/car-rental |
| JWT_SECRET | JWT secret key | your_secret_key |
| JWT_EXPIRE | JWT expiration time | 7d |
| IMAGEKIT_PUBLIC_KEY | ImageKit public key | your_public_key |
| IMAGEKIT_PRIVATE_KEY | ImageKit private key | your_private_key |
| IMAGEKIT_URL_ENDPOINT | ImageKit URL endpoint | https://ik.imagekit.io/your_id |

### Frontend

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**A.u.m.Ahsan**

## 🙏 Acknowledgments

- MongoDB for the database
- Express.js for the backend framework
- React.js for the frontend library
- Node.js for the runtime environment
- Tailwind CSS for styling
- ImageKit for image optimization
- React Router for navigation
- Axios for HTTP requests
---

**Happy Coding! 🚗💨**
