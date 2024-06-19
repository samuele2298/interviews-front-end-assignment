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
        <nav className="bg-gray-800 p-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <p onClick={handleViewPage} className="text-white text-xl font-bold"> RecipeBookPro</p>
            </div>
            <div className="flex items-center space-x-4">
                <p onClick={handleAddPage} className="text-white">Add</p>

                <p onClick={handleSearchPage} className="text-white"> Search</p>
            </div>
        </nav>
    );
};

export default Navbar;