import React from "react";
import Navbar from "./Navbar";

const Skeleton = () => {
    return (
        <div >
            <Navbar />
            <div className="p-14 w-full h-full">
                {/* Recipe Detail Skeleton */}
                <div className="flex space-x-4">

                    {/* Right column for comments section */}
                    <div className="w-2/3">
                        <div className="mb-8">
                            {/* Comments Section Skeleton */}
                            <div className="h-12 bg-gray-300 rounded-full mb-4"></div>
                        </div>

                        <div className="h-12 bg-gray-300 rounded-full mb-4"></div>

                        <div className="h-4 bg-gray-300 rounded-full mb-4"></div>

                        <div className="h-12 bg-gray-300 rounded-full mb-4"></div>

                        <div className="h-3 bg-gray-300 rounded-full mb-3"></div>


                        <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
                        <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
                        <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
                        <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
                    </div>

                    {/* Left column for recipe details */}
                    <div className=" h-1/3 w-1/3 mb-4 flex justify-center items-center bg-gray-300 animate-pulse">
                        {/* Placeholder icon */}
                        <svg
                            className="w-15 h-15 text-gray-200 dark:text-gray-600"  // Adjust the size relative to the parent container
                            aria-hidden="false"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                        >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;