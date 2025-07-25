"use client"
import { motion } from 'framer-motion';
import { FiImage, FiBook, FiMonitor, FiMusic, FiSmartphone, FiHome, FiDollarSign, FiMapPin, FiUpload, FiPlus, FiPhone } from 'react-icons/fi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useState } from 'react';

// Type definitions
type Category = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

type FormValues = {
  title: string;
  description: string;
  category: string;
  price: string;
  phone: string;
  location: string;
  images: File[];
};

// Validation Schema
const ListingSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(20, 'Description must be at least 20 characters'),
  category: Yup.string()
    .required('Category is required'),
  price: Yup.number()
    .required('Price is required')
    .min(0, 'Price cannot be negative'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{11}$/, 'Phone number must be 11 digits'),
  location: Yup.string()
    .required('Location is required'),
  images: Yup.array()
    .min(1, 'At least one image is required')
    .max(5, 'Maximum 5 images allowed')
});

const categories: Category[] = [
  { value: 'books', label: 'Books', icon: <FiBook /> },
  { value: 'electronics', label: 'Electronics', icon: <FiMonitor /> },
  { value: 'music', label: 'Music Instruments', icon: <FiMusic /> },
  { value: 'phones', label: 'Phones & Accessories', icon: <FiSmartphone /> },
  { value: 'home', label: 'Home Goods', icon: <FiHome /> },
  { value: 'other', label: 'Other', icon: <FiPlus /> }
];

export default function CreateListingPage() {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File[]) => void
  ) => {
    const files = e.target.files;
    if (files) {
      const newPreviewUrls: string[] = [];
      const newImages: File[] = [];

      Array.from(files).forEach((file: File) => {
        if (newPreviewUrls.length < 5) {
          newPreviewUrls.push(URL.createObjectURL(file));
          newImages.push(file);
        }
      });

      setPreviewImages(newPreviewUrls);
      setFieldValue('images', newImages);
    }
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Handle successful submission (redirect or show success message)
      alert('Listing created successfully!');
    } catch (error) {
      console.error('Error creating listing:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-white">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0A1A2F] text-white p-4 shadow-lg z-10"
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="text-blue-400">S2S</span>martZone
          </Link>
          <Link href="/dashboard" className="px-4 py-2 border border-blue-400 text-blue-400 rounded-lg font-medium hover:bg-blue-900/30 transition-colors">
            Back to Dashboard
          </Link>
        </div>
      </motion.nav>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-[#122943] rounded-2xl shadow-2xl border border-blue-900/50 p-8"
        >
          <div className="text-center mb-10">
            <motion.div
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-blue-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-blue-400"
            >
              <FiUpload className="w-8 h-8" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Create New Listing</h1>
            <p className="text-blue-200">Sell your items quickly to other students</p>
          </div>

          <Formik
            initialValues={{ 
              title: '',
              description: '',
              category: '',
              price: '',
              phone: '',
              location: '',
              images: []
            }}
            validationSchema={ListingSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="space-y-6">
                  {/* Title Field */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2 text-blue-200">
                      Item Title
                    </label>
                    <Field
                      type="text"
                      name="title"
                      className="w-full px-4 py-3 bg-[#0A1A2F] border border-blue-900/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="e.g. Calculus Textbook 4th Edition"
                    />
                    <ErrorMessage name="title" component="div" className="mt-1 text-sm text-red-400" />
                  </div>

                  {/* Description Field */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2 text-blue-200">
                      Description
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      rows={4}
                      className="w-full px-4 py-3 bg-[#0A1A2F] border border-blue-900/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Describe your item in detail..."
                    />
                    <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-400" />
                  </div>

                  {/* Category Field */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-2 text-blue-200">
                      Category
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {categories.map((cat) => (
                        <div key={cat.value} className="relative">
                          <Field
                            type="radio"
                            id={cat.value}
                            name="category"
                            value={cat.value}
                            className="hidden peer"
                          />
                          <label
                            htmlFor={cat.value}
                            className="flex items-center justify-center p-4 bg-[#0A1A2F] border border-blue-900/50 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-900/20 transition-colors"
                          >
                            <span className="mr-2 text-blue-400">{cat.icon}</span>
                            {cat.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    <ErrorMessage name="category" component="div" className="mt-1 text-sm text-red-400" />
                  </div>

                  {/* Price Field */}
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium mb-2 text-blue-200">
                      Price (₦)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                        <FiDollarSign />
                      </div>
                      <Field
                        type="number"
                        name="price"
                        className="w-full pl-10 pr-4 py-3 bg-[#0A1A2F] border border-blue-900/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="5000"
                      />
                    </div>
                    <ErrorMessage name="price" component="div" className="mt-1 text-sm text-red-400" />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">
                      Upload Images (Max 5)
                    </label>
                    <div className="flex flex-wrap gap-4 mb-4">
                      {previewImages.map((img: string, index: number) => (
                        <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden">
                          <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {previewImages.length < 5 && (
                        <label className="w-24 h-24 border-2 border-dashed border-blue-900/50 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                          <div className="text-center p-2">
                            <FiImage className="mx-auto text-blue-400 mb-1" />
                            <span className="text-xs text-blue-300">Add Image</span>
                          </div>
                          <input
                            type="file"
                            name="images"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, setFieldValue)}
                          />
                        </label>
                      )}
                    </div>
                    <ErrorMessage name="images" component="div" className="mt-1 text-sm text-red-400" />
                  </div>

                  {/* Contact Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-blue-200">
                      Contact Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                        <FiPhone />
                      </div>
                      <Field
                        type="tel"
                        name="phone"
                        className="w-full pl-10 pr-4 py-3 bg-[#0A1A2F] border border-blue-900/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="08012345678"
                      />
                    </div>
                    <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-400" />
                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium mb-2 text-blue-200">
                      Location (Where to meet)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                        <FiMapPin />
                      </div>
                      <Field
                        type="text"
                        name="location"
                        className="w-full pl-10 pr-4 py-3 bg-[#0A1A2F] border border-blue-900/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="e.g. Faculty of Science Block A"
                      />
                    </div>
                    <ErrorMessage name="location" component="div" className="mt-1 text-sm text-red-400" />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 px-6 rounded-lg font-bold flex items-center justify-center ${
                      isSubmitting ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                    } transition-colors mt-8`}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        Post Listing <FiUpload className="ml-2" />
                      </>
                    )}
                  </motion.button>
                </div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </main>
    </div>
  );
}