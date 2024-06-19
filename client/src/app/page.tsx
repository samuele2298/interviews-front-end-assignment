'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
const WelcomePage = () => {
    const router = useRouter(); // Initialize the router

    const handleExploreClick = () => {
        router.push('/recipe');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <h1 className="text-6xl font-bold text-white mb-8">Recipe for u</h1>
            <button
                onClick={handleExploreClick}
                className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transform transition duration-300"
            >
                Explore
            </button>
        </div>
    );
};

export default WelcomePage;
