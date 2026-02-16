"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DonationCounter() {
    // Start with a base number to make it look active
    const [count, setCount] = useState(1);

    useEffect(() => {
        // Simulate live updates
        const interval = setInterval(() => {
            // Randomly increment by 1 every 3-10 seconds
            if (Math.random() > 0.7) {
                setCount((prev) => prev + 1);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-orange-100">
            <span className="text-gray-500 font-medium text-sm text-center mb-2 uppercase tracking-wider">
                Pairs Sponsored So Far
            </span>
            <div className="flex items-baseline gap-1">
                <motion.span
                    key={count}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-primary-olive"
                >
                    {count.toLocaleString()}
                </motion.span>
                <span className="text-xl text-gray-400">pairs</span>
            </div>
        </div>
    );
}
