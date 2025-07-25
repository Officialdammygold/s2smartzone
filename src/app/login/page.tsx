"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogIn, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
    .matches(/@unijos\.edu\.ng$/, 'Must be a UNIJOS email address'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
});

// Floating shapes component for background
const FloatingShapes = () => {
  const shapes = [
    { id: 1, top: '10%', left: '5%', size: 'w-16 h-16', color: 'bg-blue-500/20' },
    { id: 2, top: '25%', left: '80%', size: 'w-24 h-24', color: 'bg-blue-500/10' },
    { id: 3, top: '65%', left: '15%', size: 'w-20 h-20', color: 'bg-blue-500/15' },
    { id: 4, top: '75%', left: '75%', size: 'w-12 h-12', color: 'bg-blue-500/20' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          initial={{ y: 0, x: 0, rotate: 0 }}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 10, 0, -10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute rounded-full ${shape.color} ${shape.size}`}
          style={{ top: shape.top, left: shape.left }}
        />
      ))}
    </div>
  );
};

// Particle burst animation for successful login
const ParticleBurst = ({ active }: { active: boolean }) => {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    angle: (i / 30) * 360,
    distance: 50 + Math.random() * 100,
    size: 4 + Math.random() * 8,
    delay: Math.random() * 0.5,
  }));

  return (
    <AnimatePresence>
      {active && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: [1, 0],
                x: Math.cos(particle.angle * (Math.PI / 180)) * particle.distance,
                y: Math.sin(particle.angle * (Math.PI / 180)) * particle.distance,
              }}
              transition={{
                duration: 1,
                delay: particle.delay,
                ease: "easeOut",
              }}
              className={`absolute rounded-full bg-blue-400`}
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (values: { email: string; password: string }, { setSubmitting }: any) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLoginSuccess(true);
      
      // Redirect after success animation
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    } catch (error) {
      console.error('Login error:', error);
      setShake(true);
      setTimeout(() => setShake(false), 1000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A1A2F] text-white overflow-hidden">
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
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium hover:text-blue-300 transition-colors">Home</Link>
            <Link href="/about" className="font-medium text-blue-300 transition-colors">About</Link>
            <Link href="/marketplace" className="font-medium hover:text-blue-300 transition-colors">Marketplace</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-blue-200">New to S2SmartZone?</span>
            <Link href="/signup" className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center">
              Sign Up <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </motion.nav>

      <main className="flex-grow flex items-center justify-center relative">
        {/* Background elements */}
        <FloatingShapes />
        
        {/* Particle burst on successful login */}
        <ParticleBurst active={loginSuccess} />
        
        {/* Login card */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            x: shake ? [0, -10, 10, -10, 10, 0] : 0
          }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 10,
            when: shake ? "" : "beforeChildren"
          }}
          className="relative z-10 w-full max-w-md px-8 py-12 bg-[#122943] rounded-2xl shadow-2xl border border-blue-900/50"
        >
          <AnimatePresence mode="wait">
            {loginSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 1,
                    ease: "easeInOut"
                  }}
                  className="text-blue-400 mb-6 flex justify-center"
                >
                  <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                <p className="text-blue-200">Redirecting to your dashboard...</p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-center mb-10"
                >
                  <div className="bg-blue-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-blue-400">
                    <FiLogIn className="w-8 h-8" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Login to S2SmartZone</h1>
                  <p className="text-blue-200">Access your student marketplace account</p>
                </motion.div>

                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={LoginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, errors, touched }:any) => (
                    <Form>
                      <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-blue-200">
                          UNIJOS Email Address
                        </label>
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="relative"
                        >
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                            <FiMail />
                          </div>
                          <Field
                            type="email"
                            name="email"
                            className={`w-full pl-10 pr-4 py-3 bg-[#0A1A2F] border ${
                              errors.email && touched.email 
                                ? 'border-red-500' 
                                : 'border-blue-900/50'
                            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                            placeholder="student@unijos.edu.ng"
                          />
                        </motion.div>
                        <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-400" />
                      </div>

                      <div className="mb-8">
                        <label htmlFor="password" className="block text-sm font-medium mb-2 text-blue-200">
                          Password
                        </label>
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="relative"
                        >
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                            <FiLock />
                          </div>
                          <Field
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className={`w-full pl-10 pr-12 py-3 bg-[#0A1A2F] border ${
                              errors.password && touched.password 
                                ? 'border-red-500' 
                                : 'border-blue-900/50'
                            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-300"
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </motion.div>
                        <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-400" />
                        <div className="mt-2 text-right">
                          <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                            Forgot password?
                          </Link>
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-4 px-6 rounded-lg font-bold flex items-center justify-center ${
                          isSubmitting ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
                        } transition-colors`}
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            Login <FiArrowRight className="ml-2" />
                          </>
                        )}
                      </motion.button>
                    </Form>
                  )}
                </Formik>

                <div className="mt-8 text-center text-blue-200">
                  <p>Don't have an account? <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium">Sign up</Link></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A1A2F] text-white py-8 border-t border-blue-900/50">
        <div className="container mx-auto px-4 text-center text-blue-300">
          <p>&copy; {new Date().getFullYear()} S2SmartZone. UNIJOS Student Marketplace.</p>
        </div>
      </footer>
    </div>
  );
}