const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Car = require('./models/Car');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const cars = [
    {
        brand: "Toyota",
        model: "Prius",
        category: "Sedan",
        year: 2023,
        pricePerDay: 8500,
        features: ["Hybrid Tech", "Reverse Camera", "Dual-Zone A/C", "Cruise Control"],
        fuelType: "Hybrid",
        transmission: "Automatic",
        seats: 5,
        availability: true,
        location: "Colombo",
        description: "The gold standard of fuel efficiency and comfort, perfect for navigating Colombo's urban landscapes.",
        images: [{
            url: "https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?auto=format&fit=crop&q=80&w=800",
            fileId: "sample_prius"
        }]
    },
    {
        brand: "Suzuki",
        model: "Alto",
        category: "Hatchback",
        year: 2022,
        pricePerDay: 4500,
        features: ["Compact Design", "Great Fuel Economy", "Easy Parking"],
        fuelType: "Petrol",
        transmission: "Manual",
        seats: 4,
        availability: true,
        location: "Kandy",
        description: "Sri Lanka's most popular hatchback, ideal for budget-friendly travel through hill country.",
        images: [{
            url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800",
            fileId: "sample_alto"
        }]
    },
    {
        brand: "Mitsubishi",
        model: "Montero Sport",
        category: "SUV",
        year: 2024,
        pricePerDay: 45000,
        features: ["Leather Interior", "4x4 Drive", "Panoramic Sunroof", "Premium Audio"],
        fuelType: "Diesel",
        transmission: "Automatic",
        seats: 7,
        availability: true,
        location: "Colombo",
        description: "Experience ultimate luxury and power with this elite SUV, perfect for business trips and luxury tours.",
        images: [{
            url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
            fileId: "sample_montero"
        }]
    },
    {
        brand: "Honda",
        model: "Vezel",
        category: "SUV",
        year: 2023,
        pricePerDay: 15000,
        features: ["Sensing Tech", "Magic Seats", "Auto Brake", "LED Headlights"],
        fuelType: "Hybrid",
        transmission: "Automatic",
        seats: 5,
        availability: true,
        location: "Galle",
        description: "A stylish and technologically advanced compact SUV, perfect for coastal drives along the south.",
        images: [{
            url: "https://images.unsplash.com/photo-1568844293986-8d04aad2b303?auto=format&fit=crop&q=80&w=800",
            fileId: "sample_vezel"
        }]
    },
    {
        brand: "Toyota",
        model: "KDH Super GL",
        category: "Van",
        year: 2022,
        pricePerDay: 18000,
        features: ["Full A/C", "Adjustable Seats", "DVD Player", "Spacious Interior"],
        fuelType: "Diesel",
        transmission: "Automatic",
        seats: 10,
        availability: true,
        location: "Negombo",
        description: "The best choice for group travel and family vacations across the island.",
        images: [{
            url: "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&q=80&w=800",
            fileId: "sample_kdh"
        }]
    },
    {
        brand: "Nissan",
        model: "Leaf",
        category: "Electric",
        year: 2023,
        pricePerDay: 12000,
        features: ["Zero Emissions", "Quiet Drive", "Eco Mode", "Fast Charge Support"],
        fuelType: "Electric",
        transmission: "Automatic",
        seats: 5,
        availability: true,
        location: "Colombo",
        description: "Modern electric travel for the eco-conscious traveler in the heart of the city.",
        images: [{
            url: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
            fileId: "sample_leaf"
        }]
    }
];

const importData = async () => {
    try {
        await Car.deleteMany();
        console.log('Existing cars removed...');

        await Car.insertMany(cars);
        console.log('Sample cars added successfully!');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
