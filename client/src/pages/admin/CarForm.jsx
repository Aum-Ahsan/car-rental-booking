import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { carsAPI } from '../../services/api';
import { FaCar, FaImage, FaTrash, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import Loading from '../../components/common/Loading';
import { toast } from 'react-toastify';

const CarForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(isEditMode);
    const [submitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        category: 'Sedan',
        year: new Date().getFullYear(),
        pricePerDay: '',
        fuelType: 'Petrol',
        transmission: 'Manual',
        seats: 5,
        location: '',
        description: '',
        features: '',
        availability: true,
        images: []
    });

    useEffect(() => {
        if (isEditMode) {
            fetchCar();
        }
    }, [id]);

    const fetchCar = async () => {
        try {
            const { data } = await carsAPI.getById(id);
            const car = data.data;
            setFormData({
                ...car,
                features: car.features.join(', '),
            });
            // Show existing images in preview
            if (car.images && car.images.length > 0) {
                setImagePreview(car.images.map(img => img.url));
            }
        } catch (error) {
            console.error('Error fetching car:', error);
            toast.error('Failed to load car details');
            navigate('/admin/cars');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Reset previews if they want to replace, or append? Let's replace for simplicity
        const newPreviews = [];
        const newFiles = [];

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push(reader.result);
                newFiles.push({
                    base64: reader.result,
                    fileName: file.name
                });

                if (newPreviews.length === files.length) {
                    setImagePreview(newPreviews);
                    setImageFiles(newFiles);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const processedData = {
            ...formData,
            features: formData.features.split(',').map(f => f.trim()).filter(f => f !== ''),
            pricePerDay: Number(formData.pricePerDay),
            year: Number(formData.year),
            seats: Number(formData.seats),
            imageFiles: imageFiles // Send the base64 files
        };

        try {
            if (isEditMode) {
                await carsAPI.update(id, processedData);
                toast.success('Car updated successfully');
            } else {
                if (imageFiles.length === 0) {
                    toast.warning('Please upload at least one car image');
                    setSubmitting(false);
                    return;
                }
                await carsAPI.create(processedData);
                toast.success('Car created successfully');
            }
            navigate('/admin/cars');
        } catch (error) {
            console.error('Error saving car:', error);
            toast.error(error.response?.data?.message || 'Failed to save car');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate('/admin/cars')}
                        className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 font-medium transition-colors"
                    >
                        <FaArrowLeft size={14} /> Back to Car Management
                    </button>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600 flex items-center justify-center text-white text-3xl shadow-lg">
                            <FaCar />
                        </div>
                        <div>
                            <h1 className="text-3xl font-display font-bold text-gray-900">
                                {isEditMode ? 'Edit Car' : 'Add New Car'}
                            </h1>
                            <p className="text-gray-600">Enter the car details below</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {/* Brand */}
                                <div>
                                    <label className="label">Brand</label>
                                    <input
                                        type="text" name="brand" required
                                        className="input" placeholder="e.g. Toyota"
                                        value={formData.brand} onChange={handleChange}
                                    />
                                </div>

                                {/* Model */}
                                <div>
                                    <label className="label">Model</label>
                                    <input
                                        type="text" name="model" required
                                        className="input" placeholder="e.g. Camry"
                                        value={formData.model} onChange={handleChange}
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="label">Category</label>
                                    <select
                                        name="category" required className="input"
                                        value={formData.category} onChange={handleChange}
                                    >
                                        <option value="Sedan">Sedan</option>
                                        <option value="SUV">SUV</option>
                                        <option value="Hatchback">Hatchback</option>
                                        <option value="Luxury">Luxury</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Electric">Electric</option>
                                        <option value="Van">Van</option>
                                    </select>
                                </div>

                                {/* Year */}
                                <div>
                                    <label className="label">Year</label>
                                    <input
                                        type="number" name="year" required min="2000"
                                        className="input" placeholder="e.g. 2024"
                                        value={formData.year} onChange={handleChange}
                                    />
                                </div>

                                {/* Price per Day */}
                                <div>
                                    <label className="label">Price per Day (Rs.)</label>
                                    <input
                                        type="number" name="pricePerDay" required min="0"
                                        className="input" placeholder="e.g. 3500"
                                        value={formData.pricePerDay} onChange={handleChange}
                                    />
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="label">Location</label>
                                    <input
                                        type="text" name="location" required
                                        className="input" placeholder="e.g. Mumbai"
                                        value={formData.location} onChange={handleChange}
                                    />
                                </div>

                                {/* Fuel Type */}
                                <div>
                                    <label className="label">Fuel Type</label>
                                    <select
                                        name="fuelType" required className="input"
                                        value={formData.fuelType} onChange={handleChange}
                                    >
                                        <option value="Petrol">Petrol</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Electric">Electric</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>

                                {/* Transmission */}
                                <div>
                                    <label className="label">Transmission</label>
                                    <select
                                        name="transmission" required className="input"
                                        value={formData.transmission} onChange={handleChange}
                                    >
                                        <option value="Manual">Manual</option>
                                        <option value="Automatic">Automatic</option>
                                    </select>
                                </div>

                                {/* Seats */}
                                <div>
                                    <label className="label">Seats</label>
                                    <input
                                        type="number" name="seats" required min="2" max="12"
                                        className="input" placeholder="e.g. 5"
                                        value={formData.seats} onChange={handleChange}
                                    />
                                </div>

                                {/* Availability Toggle */}
                                <div className="flex items-center gap-2 pt-8">
                                    <input
                                        type="checkbox" name="availability" id="availability"
                                        className="w-5 h-5 accent-primary-600 rounded cursor-pointer"
                                        checked={formData.availability} onChange={handleChange}
                                    />
                                    <label htmlFor="availability" className="font-medium text-gray-700 cursor-pointer">
                                        Mark as Available
                                    </label>
                                </div>

                                {/* Features */}
                                <div className="md:col-span-2">
                                    <label className="label">Features (comma separated)</label>
                                    <input
                                        type="text" name="features"
                                        className="input" placeholder="e.g. Bluetooth, Backup Camera, Leather Seats"
                                        value={formData.features} onChange={handleChange}
                                    />
                                </div>

                                {/* Image Upload */}
                                <div className="md:col-span-2">
                                    <label className="label">Car Images</label>
                                    <div className="mt-2 flex flex-col gap-4">
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <FaImage className="text-3xl text-gray-400 mb-2" />
                                                    <p className="text-sm text-gray-500 font-medium">Click to upload car images</p>
                                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG or WEBP (Max 5MB per file)</p>
                                                </div>
                                                <input
                                                    type="file" multiple accept="image/*"
                                                    className="hidden" onChange={handleImageChange}
                                                />
                                            </label>
                                        </div>

                                        {imagePreview.length > 0 && (
                                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                                {imagePreview.map((url, idx) => (
                                                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                                                        <img src={url} alt="Preview" className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                                                            {isEditMode && !imageFiles.length ? 'Current' : 'New Image'}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="label">Description</label>
                                    <textarea
                                        name="description" rows="4" maxLength="500"
                                        className="input resize-none py-3"
                                        placeholder="Enter a brief description of the car..."
                                        value={formData.description} onChange={handleChange}
                                    ></textarea>
                                    <div className="text-right text-xs text-gray-500 mt-1">
                                        {formData.description.length}/500
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 flex justify-end gap-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/cars')}
                                className="btn-outline border-none"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn-primary min-w-[150px]"
                            >
                                {submitting ? 'Saving...' : (isEditMode ? 'Update Car' : 'Save Car')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CarForm;
