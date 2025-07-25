"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheck, FiPhone } from 'react-icons/fi';
import Link from 'next/link';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation Schema
const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required')
    .min(3, 'Too short!'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
    .matches(/@unijos\.edu\.ng$/, 'Must be a UNIJOS email address'),
  primaryPhone: Yup.string()
    .required('Primary phone number is required')
    .matches(/^[0-9]{11}$/, 'Phone number must be 11 digits'),
  secondaryPhone: Yup.string()
    .optional()
    .matches(/^[0-9]{11}$/, 'Phone number must be 11 digits'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password')
});

// Floating gradient orbs for background
const FloatingOrbs = () => {
  const orbs = [
    { id: 1, top: '15%', left: '10%', size: 'w-32 h-32' },
    { id: 2, top: '70%', left: '80%', size: 'w-40 h-40' },
    { id: 3, top: '40%', left: '15%', size: 'w-24 h-24' },
    { id: 4, top: '20%', left: '75%', size: 'w-28 h-28' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          initial={{ y: 0, x: 0, scale: 1 }}
          animate={{
            y: [0, -40, 0, 40, 0],
            x: [0, 20, 0, -20, 0],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{
            duration: 15 + Math.random() * 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute rounded-full bg-gradient-to-br from-blue-500/10 to-blue-700/20 backdrop-blur-sm ${orb.size}`}
          style={{ top: orb.top, left: orb.left }}
        />
      ))}
    </div>
  );
};

// Confetti explosion animation
const ConfettiExplosion = ({ active }: { active: boolean }) => {
  const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    angle: Math.random() * 360,
    distance: 30 + Math.random() * 100,
    size: 6 + Math.random() * 10,
    delay: Math.random() * 0.5,
    color: ['blue-400', 'blue-500', 'white'][Math.floor(Math.random() * 3)],
    shape: ['square', 'circle', 'triangle'][Math.floor(Math.random() * 3)]
  }));

  return (
    <AnimatePresence>
      {active && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
              animate={{
                opacity: [1, 0],
                x: Math.cos(piece.angle * (Math.PI / 180)) * piece.distance,
                y: Math.sin(piece.angle * (Math.PI / 180)) * piece.distance - 100,
                rotate: 360,
              }}
              transition={{
                duration: 2,
                delay: piece.delay,
                ease: "easeOut",
              }}
              className={`absolute ${piece.shape === 'circle' ? 'rounded-full' : piece.shape === 'triangle' ? 'clip-triangle' : ''} bg-${piece.color}`}
              style={{
                width: `${piece.size}px`,
                height: `${piece.size}px`,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

// Password strength indicator
const PasswordStrength = ({ password }: { password: string }) => {
  const strength = {
    length: password.length >= 8,
    number: /\d/.test(password),
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
  };

  const strengthScore = Object.values(strength).filter(Boolean).length;
  const strengthColor = ['red-500', 'yellow-500', 'blue-400', 'green-400'][strengthScore - 1] || 'gray-500';

  return (
    <div className="mt-2">
      <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(strengthScore / 4) * 100}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full bg-${strengthColor}`}
        />
      </div>
      <div className="grid grid-cols-4 gap-1 mt-2 text-xs">
        {['8+ chars', 'Number', 'Lowercase', 'Uppercase'].map((req, i) => (
          <div key={req} className="flex items-center">
            <motion.span
              animate={{ 
                color: Object.values(strength)[i] ? `var(--color-${strengthColor})` : '#64748b',
                scale: Object.values(strength)[i] ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 0.3 }}
              className="mr-1"
            >
              <FiCheck />
            </motion.span>
            <span className={`text-${Object.values(strength)[i] ? strengthColor : 'gray-500'}`}>
              {req}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSignupSuccess(true);
      
      // Redirect after success animation
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 3000);
    } catch (error) {
      console.error('Signup error:', error);
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
            <span className="text-blue-200">Already have an account?</span>
            <Link href="/login" className="px-4 py-2 border border-blue-400 text-blue-400 rounded-lg font-medium hover:bg-blue-900/30 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </motion.nav>

      <main className="flex-grow flex items-center justify-center relative">
        {/* Background elements */}
        <FloatingOrbs />
        
        {/* Confetti explosion on success */}
        <ConfettiExplosion active={signupSuccess} />
        
        {/* Signup card */}
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
            {signupSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.5, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                  className="text-blue-400 mb-6 flex justify-center"
                >
                  <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h2 className="text-3xl font-bold mb-4">Welcome to S2SmartZone!</h2>
                <p className="text-blue-200 mb-6">Your account has been created successfully</p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-blue-300 text-sm"
                >
                  <p>Redirecting to your dashboard...</p>
                </motion.div>
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
                    <FiUser className="w-8 h-8" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Join S2SmartZone</h1>
                  <p className="text-blue-200">Create your student marketplace account</p>
                </motion.div>

                <Formik
                  initialValues={{ 
                    fullName: '',
                    email: '',
                    primaryPhone: '',
                    secondaryPhone: '',
                    password: '',
                    confirmPassword: '' 
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, errors, touched, values }) => (
                    <Form>
                      <div className="mb-6">
                        <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-blue-200">
                          Full Name
                        </label>
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="relative"
                        >
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                            <FiUser />
                          </div>
                          <Field
                            type="text"
                            name="fullName"
                            className={`w-full pl-10 pr-4 py-3 bg-[#0A1A2F] border ${
                              errors.fullName && touched.fullName 
                                ? 'border-red-500' 
                                : 'border-blue-900/50'
                            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                            placeholder="John Doe"
                          />
                        </motion.div>
                        <ErrorMessage name="fullName" component="div" className="mt-1 text-sm text-red-400" />
                      </div>

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

                      <div className="mb-6">
                        <label htmlFor="primaryPhone" className="block text-sm font-medium mb-2 text-blue-200">
                          Primary Phone Number
                        </label>
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="relative"
                        >
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                            <FiPhone />
                          </div>
                          <Field
                            type="tel"
                            name="primaryPhone"
                            className={`w-full pl-10 pr-4 py-3 bg-[#0A1A2F] border ${
                              errors.primaryPhone && touched.primaryPhone 
                                ? 'border-red-500' 
                                : 'border-blue-900/50'
                            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                            placeholder="08012345678"
                          />
                        </motion.div>
                        <ErrorMessage name="primaryPhone" component="div" className="mt-1 text-sm text-red-400" />
                      </div>

                      <div className="mb-6">
                        <label htmlFor="secondaryPhone" className="block text-sm font-medium mb-2 text-blue-200">
                          Secondary Phone Number (Optional)
                        </label>
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="relative"
                        >
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                            <FiPhone />
                          </div>
                          <Field
                            type="tel"
                            name="secondaryPhone"
                            className={`w-full pl-10 pr-4 py-3 bg-[#0A1A2F] border ${
                              errors.secondaryPhone && touched.secondaryPhone 
                                ? 'border-red-500' 
                                : 'border-blue-900/50'
                            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                            placeholder="08012345678"
                          />
                        </motion.div>
                        <ErrorMessage name="secondaryPhone" component="div" className="mt-1 text-sm text-red-400" />
                      </div>

                      <div className="mb-6">
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
                        <PasswordStrength password={values.password} />
                        <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-400" />
                      </div>

                      <div className="mb-8">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-blue-200">
                          Confirm Password
                        </label>
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="relative"
                        >
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
                            <FiLock />
                          </div>
                          <Field
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            className={`w-full pl-10 pr-12 py-3 bg-[#0A1A2F] border ${
                              errors.confirmPassword && touched.confirmPassword 
                                ? 'border-red-500' 
                                : 'border-blue-900/50'
                            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-300"
                          >
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </motion.div>
                        <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-400" />
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
                            Create Account <FiArrowRight className="ml-2" />
                          </>
                        )}
                      </motion.button>
                    </Form>
                  )}
                </Formik>

                <div className="mt-8 text-center text-blue-200">
                  <p>Already have an account? <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">Login</Link></p>
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