const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const createAdmin = async () => {
    try {
        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@example.com' });

        if (adminExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'adminpassword123', 
            phone: '1234567890',
            role: 'admin'
        });

        console.log('Admin user created successfully');
        console.log('Email: admin@example.com');
        console.log('Password: adminpassword123');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createAdmin();
