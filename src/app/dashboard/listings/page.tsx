"use client"
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiHeart, FiShare2, FiPhone, FiMapPin } from 'react-icons/fi';
import Link from 'next/link';
import { useState } from 'react';

type Listing = {
  id: string;
  title: string;
  price: number;
  status: 'sold' | 'available';
  image: string;
  category: string;
  location: string;
  phone: string;
  postedDate: string;
};

export default function ListingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    'All',
    'Books',
    'Electronics',
    'Music',
    'Phones',
    'Home Goods',
    'Other'
  ];

  const listings: Listing[] = [
    {
      id: '1',
      title: 'Calculus Textbook 4th Edition',
      price: 5000,
      status: 'available',
      image: '/placeholder-book.jpg',
      category: 'Books',
      location: 'Faculty of Science Block A',
      phone: '08012345678',
      postedDate: '2023-05-15'
    },
    {
      id: '2',
      title: 'iPhone 12 Pro Max',
      price: 250000,
      status: 'sold',
      image: '/placeholder-phone.jpg',
      category: 'Phones',
      location: 'Student Union Building',
      phone: '08087654321',
      postedDate: '2023-04-20'
    },
    {
      id: '3',
      title: 'Guitar with case',
      price: 35000,
      status: 'available',
      image: '/placeholder-guitar.jpg',
      category: 'Music',
      location: 'Arts Department',
      phone: '08011223344',
      postedDate: '2023-06-01'
    },
    {
      id: '4',
      title: 'Desk Lamp',
      price: 8000,
      status: 'available',
      image: '/placeholder-lamp.jpg',
      category: 'Home Goods',
      location: 'Hostel Block C',
      phone: '08055667788',
      postedDate: '2023-06-10'
    },
    {
      id: '5',
      title: 'Laptop Bag',
      price: 12000,
      status: 'available',
      image: '/placeholder-bag.jpg',
      category: 'Other',
      location: 'Library',
      phone: '08099887766',
      postedDate: '2023-06-05'
    },
    {
      id: '6',
      title: 'Wireless Headphones',
      price: 18000,
      status: 'available',
      image: '/placeholder-headphones.jpg',
      category: 'Electronics',
      location: 'Engineering Complex',
      phone: '08044332211',
      postedDate: '2023-06-12'
    }
  ];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || 
                          listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          <Link href="/dashboard/my-listings" className="px-4 py-2 border border-blue-400 text-blue-400 rounded-lg font-medium hover:bg-blue-900/30 transition-colors">
            My Listings
          </Link>
        </div>
      </motion.nav>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Page Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
            <p className="text-blue-200">Find great deals from other students</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                  <FiSearch />
                </div>
                <input
                  type="text"
                  placeholder="Search listings..."
                  className="w-full pl-10 pr-4 py-3 bg-[#0A1A2F] border border-blue-900/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                  <FiFilter />
                </div>
                <select
                  className="appearance-none w-full pl-10 pr-8 py-3 bg-[#0A1A2F] border border-blue-900/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={selectedCategory || 'All'}
                  onChange={(e) => setSelectedCategory(e.target.value === 'All' ? null : e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <motion.div
                key={listing.id}
                whileHover={{ y: -5 }}
                className="bg-[#122943] rounded-xl overflow-hidden shadow-lg border border-blue-900/50"
              >
                <Link href={`/dashboard/listings/${listing.id}`}>
                  <div className="relative">
                    <img 
                      src={listing.image} 
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                    {listing.status === 'sold' && (
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-red-900/80 text-red-300 text-xs font-medium">
                        Sold
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 truncate">{listing.title}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-blue-400 font-bold">₦{listing.price.toLocaleString()}</span>
                      <span className="text-sm text-blue-300 capitalize">{listing.category}</span>
                    </div>
                    <div className="flex items-center text-sm text-blue-300 mb-2">
                      <FiMapPin className="mr-1" />
                      <span className="truncate">{listing.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-blue-300">
                      <FiPhone className="mr-1" />
                      <span>{listing.phone}</span>
                    </div>
                  </div>
                </Link>
                <div className="px-4 pb-4 flex space-x-2">
                  <button className="flex-1 py-2 px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg flex items-center justify-center transition-colors">
                    <FiHeart className="mr-2" /> Save
                  </button>
                  <button className="flex-1 py-2 px-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg flex items-center justify-center transition-colors">
                    <FiShare2 className="mr-2" /> Share
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredListings.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-blue-500/10 p-6 rounded-full inline-block mb-4">
                <FiSearch className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Listings Found</h3>
              <p className="text-blue-300">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}