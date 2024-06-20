'use client'
import { useRouter } from 'next/navigation'

const Navbar = () => {

    const router = useRouter(); // Initialize the router

    const handleViewPage = () => {
        router.push('/recipe');
    };

    const handleAddPage = () => {
        router.push('/recipe/add');
    };

    const handleSearchPage = () => {
        router.push('/search');
    };
    return (
        <nav className="bg-gradient-to-r from-orange-400 to-yellow-300 p-2 flex justify-between items-center">

            <div className="flex items-center">
                {/* Left Column for Logo */}
                <div className="flex items-center justify-center mr-2 ml-3">
                    <img src="/logo.png" alt="Logo" className="w-15 h-20" />
                </div>

                {/* Right Column for Recipe4U */}
                <div className="flex items-center space-x-6">
                    <button
                        onClick={handleViewPage}
                        className="bg-transparent text-white px-6 py-3 rounded-full  text-3xl font-bold"
                        style={{ background: 'transparent', color: 'white' }}

                    >
                        Recipe4U
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-4 mr-6">
                <button
                    onClick={handleAddPage}
                    className="bg-white text-orange-500 px-4 py-2 rounded-full font-semibold  hover:text-white transition duration-300"
                    style={{ background: 'white', color: 'orange' }}

                >
                    Add
                </button>

                <button
                    onClick={handleSearchPage}
                    className="bg-white text-orange-500 px-4 py-2 rounded-full  font-semibold   hover:text-white transition duration-300"
                    style={{ background: 'white', color: 'orange' }}

                >
                    Search
                </button>
            </div>
        </nav>
    );
};

export default Navbar;