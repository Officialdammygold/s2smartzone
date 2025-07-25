"use client"
import { motion } from 'framer-motion';
import { FiUsers, FiShield, FiZap, FiBook, FiHome, FiAward } from 'react-icons/fi';
import Link from 'next/link';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const stats = [
  { value: "500+", label: "Active Users" },
  { value: "1,200+", label: "Listings" },
  { value: "95%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support" }
];

const features = [
  {
    icon: <FiShield className="w-8 h-8" />,
    title: "Trusted Community",
    description: "Verified UNIJOS students only, ensuring safe transactions"
  },
  {
    icon: <FiZap className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Quick posting and browsing with our optimized platform"
  },
  {
    icon: <FiBook className="w-8 h-8" />,
    title: "Academic Focused",
    description: "Special sections for textbooks, notes, and study materials"
  },
  {
    icon: <FiHome className="w-8 h-8" />,
    title: "Campus Essentials",
    description: "Everything from furniture to electronics in one place"
  },
  {
    icon: <FiUsers className="w-8 h-8" />,
    title: "Easy Communication",
    description: "Built-in messaging to connect buyers and sellers"
  },
  {
    icon: <FiAward className="w-8 h-8" />,
    title: "Quality Assurance",
    description: "User ratings and reviews for reliable transactions"
  }
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0A1A2F] text-white p-4 shadow-lg"
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="text-blue-400">S2S</span>martZone
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium hover:text-blue-300 transition-colors">Home</Link>
            <Link href="/about" className="font-medium text-blue-300 transition-colors">About</Link>
            <Link href="/marketplace" className="font-medium hover:text-blue-300 transition-colors">Marketplace</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/login" className="px-4 py-2 rounded hover:bg-[#122943] transition-colors">Login</Link>
            <Link href="/signup" className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </motion.nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0A1A2F] to-[#122943] text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About <span className="text-blue-400">S2SmartZone</span></h1>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                The trusted marketplace created by UNIJOS students, for UNIJOS students
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  S2SmartZone was born out of a simple idea: to create a safer, more convenient way for UNIJOS students to buy and sell items within their campus community.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  We noticed how difficult it was to find affordable textbooks, dorm essentials, and other student needs through traditional channels. At the same time, graduating students had no easy way to pass on their used items.
                </p>
                <p className="text-lg text-gray-600">
                  Our platform solves these problems by connecting buyers and sellers in a trusted, student-only environment.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:w-1/2 bg-[#0A1A2F] rounded-xl p-8 text-white"
              >
                <h3 className="text-2xl font-bold mb-6 text-blue-400">Why Choose S2SmartZone?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                      <FiShield className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold">Verified Student Community</h4>
                      <p className="text-blue-200">Only UNIJOS students with valid credentials can join</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                      <FiZap className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold">Campus-Focused Categories</h4>
                      <p className="text-blue-200">Special sections for textbooks, electronics, and dorm essentials</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                      <FiUsers className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold">Easy Meetups</h4>
                      <p className="text-blue-200">Arrange safe exchanges at campus landmarks</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={item}
                  className="bg-white p-6 rounded-xl shadow-md text-center"
                >
                  <div className="text-3xl font-bold text-blue-500 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need for seamless campus trading
              </p>
            </motion.div>
            
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  variants={item}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:shadow-md transition-all"
                >
                  <div className="bg-blue-500/10 p-3 rounded-full w-14 h-14 flex items-center justify-center text-blue-500 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-[#0A1A2F] text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
              <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                UNIJOS students building solutions for UNIJOS students
              </p>
            </motion.div>
            
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { name: "John Doe", role: "Founder & Developer", department: "Computer Science '22" },
                { name: "Jane Smith", role: "Community Manager", department: "Economics '23" },
                { name: "Mike Johnson", role: "Marketing Lead", department: "Mass Comm '24" }
              ].map((member, index) => (
                <motion.div 
                  key={index}
                  variants={item}
                  className="bg-[#122943] rounded-xl p-8 text-center"
                >
                  <div className="bg-blue-500/20 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-blue-400 text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-400 mb-2">{member.role}</p>
                  <p className="text-blue-200">{member.department}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#0A1A2F] to-[#122943] text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community Today</h2>
              <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
                Become part of UNIJOS's most trusted student marketplace
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/signup" 
                  className="px-8 py-4 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
                >
                  Create Account
                </Link>
                <Link 
                  href="/marketplace" 
                  className="px-8 py-4 border border-blue-400 text-blue-400 rounded-lg font-bold hover:bg-blue-900/30 transition-colors"
                >
                  Browse Listings
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A1A2F] text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-blue-400">S2S</span>martZone
              </h3>
              <p className="text-blue-200">
                Your student-to-student market hub at UNIJOS
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Explore</h4>
              <ul className="space-y-3">
                <li><Link href="/marketplace" className="text-blue-200 hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link href="/categories" className="text-blue-200 hover:text-white transition-colors">Categories</Link></li>
                <li><Link href="/post" className="text-blue-200 hover:text-white transition-colors">Post an Item</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-blue-200 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-blue-200 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="text-blue-200 hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="/terms" className="text-blue-200 hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="text-blue-200 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/guidelines" className="text-blue-200 hover:text-white transition-colors">Community Guidelines</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-900 pt-8 text-center text-blue-300">
            <p>&copy; {new Date().getFullYear()} S2SmartZone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}