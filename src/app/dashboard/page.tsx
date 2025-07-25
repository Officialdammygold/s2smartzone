"use client"
import { motion } from 'framer-motion'
import { FiUser, FiEdit, FiPlusSquare, FiList, FiCheckCircle, FiHome } from 'react-icons/fi'
import Link from 'next/link'

export default function DashboardHome() {
  // Mock user data - replace with actual data from your auth provider
  const user = {
    name: "John Doe",
    email: "john.doe@unijos.edu.ng",
    phone: "+234 812 345 6789",
    location: "Faculty of Science, UNIJOS",
    stats: {
      listings: 12,
      sold: 8
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name.split(' ')[0]}!</h1>
              <p className="text-gray-600">Here's what's happening with your marketplace activity</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/dashboard/create-listing"
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FiPlusSquare className="mr-2" />
                Post New Item
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-[#0A1A2F] to-[#122943] text-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-4">
                  <FiUser className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-blue-200 text-sm">{user.email}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{user.location}</span>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/dashboard/profile/edit"
                  className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <FiEdit className="mr-2" />
                  Edit Profile
                </Link>
              </motion.div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Marketplace Stats</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Listings Posted</p>
                  <p className="text-3xl font-bold text-blue-500">{user.stats.listings}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Items Sold</p>
                  <p className="text-3xl font-bold text-green-500">{user.stats.sold}</p>
                </div>
              </div>

              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(user.stats.sold / user.stats.listings) * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-blue-500"
                />
              </div>
              <p className="text-xs text-gray-500 text-center">
                {Math.round((user.stats.sold / user.stats.listings) * 100)}% sell-through rate
              </p>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <motion.div whileHover={{ x: 5 }}>
                  <Link
                    href="/dashboard/create-listing"
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <FiPlusSquare className="text-blue-500 mr-3" />
                    <span>Create New Listing</span>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ x: 5 }}>
                  <Link
                    href="/dashboard/listings"
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <FiList className="text-blue-500 mr-3" />
                    <span>View All Listings</span>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ x: 5 }}>
                  <Link
                    href="/dashboard/my-listings"
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <FiHome className="text-blue-500 mr-3" />
                    <span>View My Listings</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-blue-500 hover:text-blue-600">View All</button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                whileHover={{ x: 5 }}
                className="flex items-start p-3 border-b border-gray-100 last:border-0"
              >
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <FiCheckCircle className="text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Your listing "Organic Chemistry Textbook" was viewed by 5 students
                  </p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}