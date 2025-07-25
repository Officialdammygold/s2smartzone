"use client"
import { motion } from 'framer-motion';
import { FiHome, FiList, FiPlusSquare, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Profile', href: '/dashboard/profile', icon: <FiUser /> },
    { name: 'All Listings', href: '/dashboard/listings', icon: <FiList /> },
    { name: 'Create Listing', href: '/dashboard/create-listing', icon: <FiPlusSquare /> },
    { name: 'My Listings', href: '/dashboard/my-listings', icon: <FiHome /> },
    { name: 'Settings', href: '/dashboard/profile/edit', icon: <FiSettings /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex flex-col w-64 bg-[#0A1A2F] text-white border-r border-blue-900/50"
      >
        <div className="p-4 border-b border-blue-900/50">
          <h1 className="text-2xl font-bold">
            <span className="text-blue-400">S2S</span>martZone
          </h1>
          <p className="text-blue-200 text-sm">Student Marketplace</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center p-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-blue-500 text-white'
                  : 'text-blue-200 hover:bg-blue-900/30'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-blue-900/50">
          <button
            onClick={() => signOut()}
            className="flex items-center w-full p-3 text-blue-200 hover:bg-blue-900/30 rounded-lg transition-colors"
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </motion.div>

      {/* Mobile bottom navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0A1A2F] border-t border-blue-900/50 z-10">
        <nav className="flex justify-around p-2">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                pathname === item.href ? 'text-blue-400' : 'text-blue-200'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              {navItems.find(item => item.href === pathname)?.name || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
                <FiSettings />
              </button>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <FiUser />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}