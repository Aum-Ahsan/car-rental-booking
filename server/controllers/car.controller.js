const Car = require('../models/Car');
const imagekit = require('../config/imagekit');

// @desc    Get all cars with filters
// @route   GET /api/cars
// @access  Public
exports.getCars = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, search, location, availability } = req.query;

        // Build query
        let query = {};

        if (category) {
            query.category = category;
        }

        if (minPrice || maxPrice) {
            query.pricePerDay = {};
            if (minPrice) query.pricePerDay.$gte = Number(minPrice);
            if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
        }

        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        if (availability !== undefined) {
            query.availability = availability === 'true';
        }

        if (search) {
            query.$or = [
                { brand: { $regex: search, $options: 'i' } },
                { model: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const cars = await Car.find(query).sort('-createdAt');

        res.status(200).json({
            success: true,
            count: cars.length,
            data: cars
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single car
// @route   GET /api/cars/:id
// @access  Public
exports.getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: 'Car not found'
            });
        }

        res.status(200).json({
            success: true,
            data: car
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.createCar = async (req, res) => {
    try {
        const carData = req.body;

        // Handle image upload if provided
        if (req.body.imageFiles && Array.isArray(req.body.imageFiles)) {
            const uploadedImages = [];

            const isImageKitConfigured =
                process.env.IMAGEKIT_PUBLIC_KEY &&
                !process.env.IMAGEKIT_PUBLIC_KEY.includes('your_') &&
                process.env.IMAGEKIT_PRIVATE_KEY &&
                !process.env.IMAGEKIT_PRIVATE_KEY.includes('your_');

            for (const imageFile of req.body.imageFiles) {
                if (isImageKitConfigured) {
                    try {
                        const uploadResponse = await imagekit.upload({
                            file: imageFile.base64,
                            fileName: imageFile.fileName,
                            folder: '/car-rental/cars'
                        });

                        uploadedImages.push({
                            url: uploadResponse.url,
                            fileId: uploadResponse.fileId
                        });
                    } catch (uploadError) {
                        console.error('ImageKit upload failed:', uploadError);
                        // Fallback to base64 if upload fails
                        uploadedImages.push({
                            url: imageFile.base64,
                            fileId: 'local-' + Date.now()
                        });
                    }
                } else {
                    // Not configured, use base64 directly (for demo/EXPO purposes)
                    uploadedImages.push({
                        url: imageFile.base64,
                        fileId: 'local-' + Date.now()
                    });
                }
            }

            carData.images = uploadedImages;
        }

        const car = await Car.create(carData);

        res.status(201).json({
            success: true,
            message: 'Car created successfully',
            data: car
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update car
// @route   PUT /api/cars/:id
// @access  Private/Admin
exports.updateCar = async (req, res) => {
    try {
        let car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: 'Car not found'
            });
        }

        const updateData = req.body;

        const isImageKitConfigured =
            process.env.IMAGEKIT_PUBLIC_KEY &&
            !process.env.IMAGEKIT_PUBLIC_KEY.includes('your_') &&
            process.env.IMAGEKIT_PRIVATE_KEY &&
            !process.env.IMAGEKIT_PRIVATE_KEY.includes('your_');

        // Handle new image uploads if provided
        if (req.body.imageFiles && Array.isArray(req.body.imageFiles)) {
            const uploadedImages = [];

            for (const imageFile of req.body.imageFiles) {
                if (isImageKitConfigured) {
                    try {
                        const uploadResponse = await imagekit.upload({
                            file: imageFile.base64,
                            fileName: imageFile.fileName,
                            folder: '/car-rental/cars'
                        });

                        uploadedImages.push({
                            url: uploadResponse.url,
                            fileId: uploadResponse.fileId
                        });
                    } catch (uploadError) {
                        console.error('ImageKit upload failed:', uploadError);
                        uploadedImages.push({
                            url: imageFile.base64,
                            fileId: 'local-' + Date.now()
                        });
                    }
                } else {
                    uploadedImages.push({
                        url: imageFile.base64,
                        fileId: 'local-' + Date.now()
                    });
                }
            }

            // If we have new images, they replace all old ones in this simple implementation
            // In a better one, we'd allow partial updates
            if (car.images && car.images.length > 0 && isImageKitConfigured) {
                for (const image of car.images) {
                    if (image.fileId && !image.fileId.startsWith('local-')) {
                        try {
                            await imagekit.deleteFile(image.fileId);
                        } catch (err) {
                            console.error('Error deleting image:', err);
                        }
                    }
                }
            }
            updateData.images = uploadedImages;
        }

        car = await Car.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            message: 'Car updated successfully',
            data: car
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: 'Car not found'
            });
        }

        // Delete images from ImageKit
        if (car.images.length > 0) {
            for (const image of car.images) {
                try {
                    await imagekit.deleteFile(image.fileId);
                } catch (err) {
                    console.error('Error deleting image:', err);
                }
            }
        }

        await Car.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Car deleted successfully',
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all car categories
// @route   GET /api/cars/categories/all
// @access  Public
exports.getCategories = async (req, res) => {
    try {
        const categories = await Car.distinct('category');

        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
