"use client"
import { motion } from 'framer-motion';
import { FiHome, FiUser, FiSearch, FiHeart, FiPlus, FiMenu } from 'react-icons/fi';
import Link from 'next/link';

export default function Header() {
  const navItems = [
    { id: 'home', icon: FiHome, label: 'Home', href: '/' },
    { id: 'search', icon: FiSearch, label: 'Search', href: '/search' },
    { id: 'create', icon: FiPlus, label: 'Create', href: '/dashboard/create-listing' },
    { id: 'favorites', icon: FiHeart, label: 'Favorites', href: '/favorites' },
    { id: 'profile', icon: FiUser, label: 'Profile', href: '/profile' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto">
        {/* Mobile Header - Full Width */}
        <div className="sm:hidden px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FiMenu className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-lg font-bold text-gray-900">CampusMarket</h1>
            </div>
            <Link
              href="/dashboard/create-listing"
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FiPlus className="w-5 h-5" />
            </Link>
          </div>
          
          {/* Mobile Navigation - Spans full width */}
          <nav className="mt-4 grid grid-cols-4 gap-2">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Icon className="w-5 h-5 text-gray-600 mb-1" />
                  <span className="text-xs text-gray-600 font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop Header - Hidden on small screens */}
        <div className="hidden sm:block">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-gray-900">CampusMarket</h1>
              </Link>
              
              <nav className="hidden lg:flex items-center space-x-6">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Medium screens - Icons only */}
              <nav className="lg:hidden flex items-center space-x-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                      title={item.label}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/create-listing"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                <FiPlus className="w-4 h-4 lg:mr-2" />
                <span className="hidden lg:inline">New Listing</span>
              </Link>
              
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                <FiUser className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}