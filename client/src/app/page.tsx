'use client'

import React from 'react';
import { useRouter } from 'next/navigation'

const WelcomePage = () => {
    const router = useRouter();

    const handleExploreClick = () => {
        router.push('/recipe');
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-orange-400 to-yellow-300">
            <div className="flex items-center justify-center space-x-6">

                {/* Left Column: Image */}
                <div className="flex-shrink-0">
                    <img src="/logo.png" alt="Logo" className="w-80 h-80 " />
                </div>

                {/* Right Column: Title and Buttons */}
                <div className=" flex-col justify-center space-y-6">

                    {/* Title */}
                    <h1 className="text-6xl md:text-8xl font-bold text-white">Recipe4u</h1>

                    {/* Explore Button */}
                    <button
                        onClick={handleExploreClick}
                        className="bg-white text-orange-500 px-8 py-4 rounded-full shadow-md hover:scale-105 transform transition duration-300"
                    >
                        Explore
                    </button>

                </div>

            </div>
        </div>


    );
};

export default WelcomePage;

