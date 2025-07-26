'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    name: 'Running',
    image: '/banners/running-shoes-banner.jpg',
    description: 'Engineered for performance and comfort'
  },
  {
    name: 'Football',
    image: '/banners/football-shoes-banner.jpg',
    description: 'Dominate the field with precision'
  },
  {
    name: 'Cricket',
    image: '/banners/cricket-shoes-banner.jpg',
    description: 'Perfect grip for the perfect game'
  }
];

export default function NewSportsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Sports Excellence
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover our premium collection of sports footwear designed for peak performance
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative group overflow-hidden rounded-2xl shadow-lg h-[300px]"
            >
              <div className="relative w-full h-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white transform transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-200 mb-4">{category.description}</p>
                <Link href={`/search?q=${category.name.toLowerCase()}`}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black cursor-pointer px-6 py-2 rounded-full font-semibold text-sm uppercase tracking-wider self-start hover:bg-opacity-90 transition-colors"
                  >
                    Shop Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}