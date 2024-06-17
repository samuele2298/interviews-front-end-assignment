// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <Link href="/" className="text-white text-xl font-bold"> RecipeBookPro</Link>
            </div>
            <div className="flex items-center space-x-4">
                <Link href="/add" className="text-white">Add</Link>
                <Link href="/search" className="text-white"> Search</Link>
            </div>
        </nav>
    );
};

export default Navbar;