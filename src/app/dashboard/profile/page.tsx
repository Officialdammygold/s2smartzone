"use client"
import { motion } from 'framer-motion';
import { FiEdit } from 'react-icons/fi';
import Link from 'next/link';

export default function ProfilePage() {
  // Mock user data - in a real app, this would come from your auth provider
  const user = {
    name: "John Doe",
    email: "john.doe@unijos.edu.ng",
    phone: "+234 812 345 6789",
    listings: 12,
    sold: 8,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
            <p className="text-gray-600">Manage your account information</p>
          </div>
          <Link
            href="/dashboard/profile/edit"
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FiEdit className="mr-2" />
            Edit Profile
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{user.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{user.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{user.phone}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Listings Posted</p>
                <p className="text-2xl font-bold text-blue-500">{user.listings}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Items Sold</p>
                <p className="text-2xl font-bold text-green-500">{user.sold}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        {/* Activity feed would go here */}
        <p className="text-gray-500 text-center py-8">Your recent activity will appear here</p>
      </div>
    </motion.div>
  );
}