"use client"
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2, FiCheckCircle, FiPlus } from 'react-icons/fi';
import Link from 'next/link';
import { useState } from 'react';

type Listing = {
  id: string;
  title: string;
  price: number;
  status: 'sold' | 'unsold';
  image: string;
  category: string;
  postedDate: string;
};

export default function MyListingsPage() {
  const [listings, setListings] = useState<Listing[]>([
    {
      id: '1',
      title: 'Calculus Textbook 4th Edition',
      price: 5000,
      status: 'unsold',
      image: '/placeholder-book.jpg',
      category: 'books',
      postedDate: '2023-05-15'
    },
    {
      id: '2',
      title: 'iPhone 12 Pro Max',
      price: 250000,
      status: 'sold',
      image: '/placeholder-phone.jpg',
      category: 'phones',
      postedDate: '2023-04-20'
    },
    {
      id: '3',
      title: 'Guitar with case',
      price: 35000,
      status: 'unsold',
      image: '/placeholder-guitar.jpg',
      category: 'music',
      postedDate: '2023-06-01'
    }
  ]);

  const handleDelete = (id: string) => {
    setListings(listings.filter(listing => listing.id !== id));
  };

  const toggleStatus = (id: string) => {
    setListings(listings.map(listing => 
      listing.id === id 
        ? { ...listing, status: listing.status === 'sold' ? 'unsold' : 'sold' } 
        : listing
    ));
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
          <Link href="/dashboard/create-listing" className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center">
            <FiPlus className="mr-2" /> New Listing
          </Link>
        </div>
      </motion.nav>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-2">My Listings</h1>
            <p className="text-blue-200">Manage your marketplace activity</p>
          </div>

          {/* Status Filters */}
          <div className="flex space-x-4 mb-8">
            <button className="px-4 py-2 bg-[#122943] rounded-lg border border-blue-900/50 hover:bg-blue-900/20 transition-colors">
              All Listings
            </button>
            <button className="px-4 py-2 bg-[#122943] rounded-lg border border-blue-900/50 hover:bg-blue-900/20 transition-colors">
              Active
            </button>
            <button className="px-4 py-2 bg-[#122943] rounded-lg border border-blue-900/50 hover:bg-blue-900/20 transition-colors">
              Sold
            </button>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <motion.div
                key={listing.id}
                whileHover={{ y: -5 }}
                className="bg-[#122943] rounded-xl overflow-hidden shadow-lg border border-blue-900/50"
              >
                <div className="relative">
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${
                    listing.status === 'sold' ? 'bg-green-900/80 text-green-300' : 'bg-blue-900/80 text-blue-300'
                  }`}>
                    {listing.status === 'sold' ? 'Sold' : 'Available'}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold truncate">{listing.title}</h3>
                    <span className="text-blue-400 font-bold">₦{listing.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-blue-300 mb-4">
                    <span className="capitalize">{listing.category}</span>
                    <span>Posted: {new Date(listing.postedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Link 
                      href={`/dashboard/edit-listing/${listing.id}`}
                      className="flex-1 py-2 px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <FiEdit className="mr-2" /> Edit
                    </Link>
                    <button
                      onClick={() => toggleStatus(listing.id)}
                      className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center transition-colors ${
                        listing.status === 'sold'
                          ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400'
                          : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                      }`}
                    >
                      <FiCheckCircle className="mr-2" /> {listing.status === 'sold' ? 'Mark Available' : 'Mark Sold'}
                    </button>
                    <button
                      onClick={() => handleDelete(listing.id)}
                      className="flex-1 py-2 px-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <FiTrash2 className="mr-2" /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {listings.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-blue-500/10 p-6 rounded-full inline-block mb-4">
                <FiPlus className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Listings Yet</h3>
              <p className="text-blue-300 mb-4">You haven't posted any items for sale yet.</p>
              <Link 
                href="/dashboard/create-listing"
                className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
              >
                <FiPlus className="mr-2" /> Create Your First Listing
              </Link>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}