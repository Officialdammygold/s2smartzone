"use client"
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function ListingCard({ listing }: { listing: any }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all"
    >
      <Link href={`/dashboard/listings/${listing.id}`}>
        <div className="relative h-48 bg-gray-100">
          {listing.image ? (
            <Image
              src={listing.image}
              alt={listing.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          {listing.sold && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
              SOLD
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 mb-1">{listing.title}</h3>
          <p className="text-blue-500 font-bold mb-2">{listing.price}</p>
          <p className="text-gray-500 text-sm flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {listing.location}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}