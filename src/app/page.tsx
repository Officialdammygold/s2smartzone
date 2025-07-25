 "use client"
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiShoppingBag, FiShield, FiZap, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';


// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const slideVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const products = [
  {
    id: 1,
    name: 'Used Laptop - HP EliteBook',
    description: 'Core i5, 8GB RAM, 256GB SSD — perfect for schoolwork and projects.',
    price: '₦150,000',
    icon: <FiShoppingBag className="w-12 h-12" />
  },
  {
    id: 2,
    name: 'Organic Chemistry Textbook',
    description: 'Detailed textbook for second-year science and engineering students.',
    price: '₦3,500',
    icon: <FiShield className="w-12 h-12" />
  },
  {
    id: 3,
    name: 'Room Fan (Rechargeable)',
    description: 'Energy-saving fan with backup battery — great for hostel rooms.',
    price: '₦9,000',
    icon: <FiZap className="w-12 h-12" />
  },
  {
    id: 4,
    name: 'Samsung Galaxy A20 (Fairly Used)',
    description: 'Reliable smartphone with good battery life, ideal for students.',
    price: '₦35,000',
    icon: <FiShoppingBag className="w-12 h-12" />
  },
  {
    id: 5,
    name: 'Engineering Drawing Set',
    description: 'Includes T-square, compass, and all essential tools for technical courses.',
    price: '₦2,800',
    icon: <FiShield className="w-12 h-12" />
  },
  {
    id: 6,
    name: 'Bluetooth Earbuds',
    description: 'Wireless sound for lectures, calls, and entertainment.',
    price: '₦6,000',
    icon: <FiZap className="w-12 h-12" />
  },
  {
    id: 7,
    name: 'Reading Table + Chair',
    description: 'Compact furniture set for personal reading space in hostels.',
    price: '₦18,000',
    icon: <FiShoppingBag className="w-12 h-12" />
  },
  {
    id: 8,
    name: 'Calculator (Casio FX-991ES)',
    description: 'Original scientific calculator — a must-have for every STEM student.',
    price: '₦5,500',
    icon: <FiShield className="w-12 h-12" />
  },
  {
    id: 9,
    name: 'Used Mattress (4x6)',
    description: 'Clean and firm mattress, suitable for off-campus hostels.',
    price: '₦12,000',
    icon: <FiZap className="w-12 h-12" />
  },
];


const slides = [
  {
    title: "Seamless Student Trading",
    description: "A simple platform built for UNIJOS students to buy, sell, and connect easily",
    icon: <FiShield className="w-24 h-24" />
  },
  {
    title: "Fast and Reliable Experience",
    description: "Enjoy quick browsing, smooth listings, and dependable access — anytime, anywhere",
    icon: <FiZap className="w-24 h-24" />
  },
  {
    title: "Easy to Use",
    description: "Post, find, and connect with just a few clicks. No tech skills required",
    icon: <FiShoppingBag className="w-24 h-24" />
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleProductClick = (e:any, productId:number) => {
    if (!isLoggedIn) {
      e.preventDefault();
      window.location.href = '/signup';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <header className="flex items-center gap-4 p-4 bg-[#0A1A2D]">
      </header>
        <title>Home | S2SmartZone</title>
        <meta name="description" content="Premium solutions for modern businesses" />
      </Head>

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
            <Link href="/about" className="font-medium hover:text-blue-300 transition-colors">About</Link>
            <Link href="/marketplace" className="font-medium hover:text-blue-300 transition-colors">Marketplace</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/login" className="px-4 py-2 rounded hover:bg-[#122943] transition-colors">Login</Link>
            <Link href="/signup" className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center">
              Get Started <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </motion.nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0A1A2F] to-[#122943] text-white py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 mb-12 lg:mb-0"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                 Your student-to-student<span className="text-blue-400"> market hub</span>
                </h1>
                <p className="text-lg text-blue-100 mb-8 max-w-lg">
                 S2SmartZone is a platform designed to help students and graduates of UNIJOS buy and sell items like books, electronics, furniture, and more — all within a trusted campus community.
                </p>
                <div className="flex space-x-4">
                  <Link href="/signup" className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center">
                    Start Now <FiArrowRight className="ml-2" />
                  </Link>
                  <Link href="/about" className="px-6 py-3 border border-blue-400 text-blue-400 rounded-lg font-medium hover:bg-blue-900/30 transition-colors">
                    Learn More
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:w-1/2 relative"
              >
                <div className="relative h-96 w-full bg-[#122943] rounded-xl shadow-2xl overflow-hidden border border-blue-900/50">
                  <AnimatePresence custom={direction} initial={false}>
                    <motion.div
                      key={currentSlide}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-8"
                    >
                      <div className="text-blue-400 mb-6">
                        {slides[currentSlide].icon}
                      </div>
                      <h2 className="text-2xl font-bold mb-2 text-center">{slides[currentSlide].title}</h2>
                      <p className="text-blue-200 text-center max-w-md">{slides[currentSlide].description}</p>
                    </motion.div>
                  </AnimatePresence>
                  
                  <button 
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <FiChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <FiChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Solutions</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find the right deals for your campus needs
              </p>
            </motion.div>
            
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {products.map((product) => (
                <motion.div 
                  key={product.id}
                  variants={item}
                  whileHover={{ y: -10 }}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200"
                >
                  <div className="p-8 flex flex-col items-center">
                    <div className="bg-blue-500/10 p-4 rounded-full text-blue-500 mb-6">
                      {product.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-center mb-6">{product.description}</p>
                    <div className="text-2xl font-bold text-blue-500 mb-6">{product.price}</div>
                    <Link 
                      href={`/products/${product.id}`} 
                      onClick={(e) => handleProductClick(e, product.id)}
                      className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-center flex items-center justify-center"
                    >
                      View Details <FiArrowRight className="ml-2" />
                    </Link>
                  </div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Simplify Campus Trading?</h2>
              <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
               Join hundreds of UNIJOS students already using S2SmartZone to buy, sell, and connect easily.
              </p>
              <Link 
                href="/signup" 
                className="inline-block px-8 py-4 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors text-lg"
              >
                Get Started Today
              </Link>
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
                Your student-to-student market hub.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Explore
</h4>
              <ul className="space-y-3">
                <li><Link href="/features" className="text-blue-200 hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link href="/pricing" className="text-blue-200 hover:text-white transition-colors">Categories</Link></li>
                <li><Link href="/marketplace" className="text-blue-200 hover:text-white transition-colors">Post an Item</Link></li>
                <li><Link href="/marketplace" className="text-blue-200 hover:text-white transition-colors">Browse Listings</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-blue-200 hover:text-white transition-colors">Login / Sign Up</Link></li>
                <li><Link href="/about" className="text-blue-200 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="text-blue-200 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/blog" className="text-blue-200 hover:text-white transition-colors">Help & Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </Link>
                
              </div>
              <ul className="space-y-3 mt-4">
                <li><Link href="/about" className="text-blue-200 hover:text-white transition-colors">Terms of Use</Link></li>
                <li><Link href="/about" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-900 pt-8 text-center text-blue-300">
            <p>&copy; {new Date().getFullYear()} NexaScale. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}