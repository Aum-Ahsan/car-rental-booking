# 🚀 Quick Start Guide - Car Rental Booking Website

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js installed (v14+)
- ✅ MongoDB installed and running OR MongoDB Atlas account
- ✅ ImageKit account (for production image uploads)

## Setup Steps

### 1. Install MongoDB (if running locally)

**Windows:**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/atlas

**Start MongoDB:**
```powershell
# Usually starts automatically as a service
# Or start manually:
mongod
```

### 2. Install Dependencies

**Backend:**
```powershell
cd server
npm install
```

**Frontend:**
```powershell
cd client
npm install
```

### 3. Configure Environment Variables

**Server (.env):**
- The `.env` file is already created in `/server`
- Update `MONGODB_URI` if using MongoDB Atlas
- Update ImageKit credentials when ready (optional for initial testing)

**Client (.env):**
- The `.env` file is already created in `/client`
- No changes needed for local development

### 4. Start the Application

**Terminal 1 - Backend:**
```powershell
cd server
npm run dev
```
✅ Server runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```powershell
cd client
npm run dev
```
✅ Client runs on: http://localhost:5173

### 5. Test the Application

1. Open browser: http://localhost:5173
2. Register a new user
3. Browse available cars
4. Test the booking system

### 6. Create Admin User

After registering, to access admin features:

**Option 1: Using MongoDB Compass or Shell**
```javascript
// Connect to MongoDB
use car-rental

// Update user role to admin
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

**Option 2: Using MongoDB Compass GUI**
1. Open MongoDB Compass
2. Connect to your database
3. Find the `users` collection
4. Edit a user document
5. Change `role` from "user" to "admin"

### 7. Access Admin Dashboard

- Login with the admin account
- Navigate to Admin Dashboard
- Manage cars, bookings, and users

## Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend client loads successfully
- [ ] User registration works
- [ ] User login works
- [ ] Can browse cars (seed data needed)
- [ ] Can create bookings
- [ ] Admin dashboard accessible (after role change)

## Common Issues & Solutions

### MongoDB Connection Error
**Error:** "MongoError: connect ECONNREFUSED"
**Solution:** 
- Ensure MongoDB is running
- Check MongoDB URI in `.env`
- Use MongoDB Atlas if local setup fails

### Port Already in Use
**Error:** "Port 5000 is already in use"
**Solution:**
- Change PORT in `server/.env` to another port (e.g., 5001)
- Update `VITE_API_URL` in `client/.env` accordingly

### CORS Error
**Error:** "CORS policy blocked"
**Solution:**
- Ensure backend is running
- Check CORS configuration in `server.js`

## Adding Sample Data

To test the application with sample cars, you can:

1. Use the Admin Dashboard (after becoming admin)
2. Or insert via MongoDB:

```javascript
db.cars.insertMany([
  {
    brand: "Toyota",
    model: "Camry",
    category: "Sedan",
    year: 2023,
    pricePerDay: 2500,
    features: ["AC", "GPS", "Bluetooth"],
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
    availability: true,
    images: [],
    location: "Mumbai",
    description: "Comfortable sedan perfect for city driving",
    createdAt: new Date()
  },
  {
    brand: "Honda",
    model: "CR-V",
    category: "SUV",
    year: 2023,
    pricePerDay: 4000,
    features: ["AC", "GPS", "Sunroof", "4WD"],
    fuelType: "Diesel",
    transmission: "Automatic",
    seats: 7,
    availability: true,
    images: [],
    location: "Delhi",
    description: "Spacious SUV for family trips",
    createdAt: new Date()
  }
])
```

## ImageKit Setup (Optional)

For production image uploads:

1. Sign up at https://imagekit.io/
2. Get your credentials:
   - Public Key
   - Private Key
   - URL Endpoint
3. Update in `server/.env`:
   ```env
   IMAGEKIT_PUBLIC_KEY=your_public_key
   IMAGEKIT_PRIVATE_KEY=your_private_key
   IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
   ```

**Note:** ImageKit is optional for testing. You can add cars with empty images array initially.

## Next Steps

1. ✅ Complete remaining pages (CarDetails, MyBookings, Admin pages)
2. ✅ Add more features (payment integration, reviews)
3. ✅ Deploy to production
4. ✅ Add tests

## Support

If you encounter any issues:
1. Check console logs (both frontend and backend)
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check port conflicts

Happy Coding! 🚗💨
