# 📡 API Endpoints Reference

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-api-domain.com/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "role": "user"
    },
    "token": "jwt_token"
  }
}
```

---

### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "role": "user"
    },
    "token": "jwt_token"
  }
}
```

---

### Get Current User
```http
GET /auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 🚗 Car Endpoints

### Get All Cars (with Filters)
```http
GET /cars
```

**Query Parameters:**
- `category` (optional): Filter by category
- `minPrice` (optional): Minimum price per day
- `maxPrice` (optional): Maximum price per day
- `search` (optional): Search by brand/model
- `location` (optional): Filter by location
- `availability` (optional): true/false

**Example:**
```
GET /cars?category=SUV&minPrice=2000&maxPrice=5000&availability=true
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "car_id",
      "brand": "Toyota",
      "model": "Camry",
      "category": "Sedan",
      "year": 2023,
      "pricePerDay": 2500,
      "features": ["AC", "GPS", "Bluetooth"],
      "fuelType": "Petrol",
      "transmission": "Automatic",
      "seats": 5,
      "availability": true,
      "images": [
        {
          "url": "https://image-url.com/car.jpg",
          "fileId": "file_id"
        }
      ],
      "location": "Mumbai",
      "description": "Comfortable sedan",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get Single Car
```http
GET /cars/:id
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "car_id",
    "brand": "Toyota",
    "model": "Camry",
    ...
  }
}
```

---

### Get All Categories
```http
GET /cars/categories/all
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": ["Sedan", "SUV", "Hatchback", "Luxury", "Sports", "Electric", "Van"]
}
```

---

### Create Car (Admin Only)
```http
POST /cars
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "brand": "Honda",
  "model": "Civic",
  "category": "Sedan",
  "year": 2023,
  "pricePerDay": 3000,
  "features": ["AC", "GPS", "Bluetooth", "Sunroof"],
  "fuelType": "Petrol",
  "transmission": "Automatic",
  "seats": 5,
  "location": "Delhi",
  "description": "Sporty sedan with modern features",
  "imageFiles": [
    {
      "base64": "base64_string",
      "fileName": "car-image.jpg"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Car created successfully",
  "data": { ... }
}
```

---

### Update Car (Admin Only)
```http
PUT /cars/:id
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:** Same as Create Car

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Car updated successfully",
  "data": { ... }
}
```

---

### Delete Car (Admin Only)
```http
DELETE /cars/:id
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Car deleted successfully",
  "data": {}
}
```

---

## 📅 Booking Endpoints

### Create Booking
```http
POST /bookings
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "car": "car_id",
  "pickupLocation": "Mumbai Airport",
  "pickupDate": "2024-02-15T10:00:00.000Z",
  "returnDate": "2024-02-20T10:00:00.000Z",
  "notes": "Please ensure the car is clean"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "_id": "booking_id",
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890"
    },
    "car": {
      "brand": "Toyota",
      "model": "Camry",
      ...
    },
    "pickupLocation": "Mumbai Airport",
    "pickupDate": "2024-02-15T10:00:00.000Z",
    "returnDate": "2024-02-20T10:00:00.000Z",
    "totalPrice": 12500,
    "status": "pending",
    "paymentStatus": "pending",
    "notes": "Please ensure the car is clean",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Get User's Bookings
```http
GET /bookings
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "data": [ ... ]
}
```

---

### Get Single Booking
```http
GET /bookings/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": { ... }
}
```

---

### Update Booking
```http
PUT /bookings/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "confirmed",
  "notes": "Updated notes"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Booking updated successfully",
  "data": { ... }
}
```

---

### Cancel Booking
```http
DELETE /bookings/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": { ... }
}
```

---

## 👨‍💼 Admin Endpoints

### Get Dashboard Statistics
```http
GET /admin/stats
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 150,
      "totalCars": 50,
      "totalBookings": 300,
      "totalRevenue": 750000,
      "availableCars": 35,
      "unavailableCars": 15
    },
    "bookingStatus": {
      "pending": 20,
      "confirmed": 50,
      "completed": 200,
      "cancelled": 30
    },
    "recentBookings": [ ... ],
    "bookingsByCategory": [
      { "_id": "SUV", "count": 120 },
      { "_id": "Sedan", "count": 100 },
      ...
    ],
    "monthlyRevenue": [
      { "_id": { "year": 2024, "month": 1 }, "revenue": 125000, "count": 50 },
      ...
    ]
  }
}
```

---

### Get All Users
```http
GET /admin/users
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 150,
  "data": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "role": "user",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get All Bookings
```http
GET /admin/bookings
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 300,
  "data": [ ... ]
}
```

---

### Delete User
```http
DELETE /admin/users/:id
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {}
}
```

---

### Update User Role
```http
PUT /admin/users/:id/role
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "role": "admin"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User role updated successfully",
  "data": { ... }
}
```

---

## 🚨 Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role 'user' is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server error message"
}
```

---

## 📝 Notes

- All dates should be in ISO 8601 format
- Prices are in INR (Indian Rupees)
- Images can be uploaded as base64 strings for ImageKit
- Booking dates must be in the future
- Return date must be after pickup date
- JWT tokens expire after 7 days (configurable)
- Admin role required for admin endpoints

---

## 🧪 Testing with Postman/Thunder Client

1. **Register a user** → Get token
2. **Login** → Get token
3. **Use token** in Authorization header for protected routes
4. **Change user role to admin** in MongoDB
5. **Test admin endpoints** with admin token

**Happy Testing! 🚀**
