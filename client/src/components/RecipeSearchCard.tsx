'use client'
import React from 'react';
import { RecipeType } from '../types/api';
import { useRouter } from 'next/navigation'; // Corrected import path for useRouter

interface RecipeProps {
    recipe: RecipeType;
}

const RecipeSearchCard: React.FC<RecipeProps> = ({ recipe }) => {
    const router = useRouter();

    const handleDetailClick = () => {
        router.push(`/recipe/${recipe.id}`);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
                <h3 className="text-1xl md:text-4xl lg:text-3xl font-bold text-gray-900 pb-2">{recipe.name}</h3>
            </div>
            <div className="flex justify-end p-4 bg-gray-100">
                <button
                    onClick={handleDetailClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
                >
                    View Recipe
                </button>
            </div>
        </div>
    );
};

export default RecipeSearchCard;
