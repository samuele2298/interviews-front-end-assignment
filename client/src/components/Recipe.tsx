

import React from 'react';
import { RecipeType } from '../types/api'; // Importing the Recipe interface with an alias
import { useRouter } from 'next/navigation'

interface RecipeProps {
    recipe: RecipeType;
}

const RecipeComponent: React.FC<RecipeProps> = ({ recipe }) => {

    const router = useRouter();

    const handleDetailClick = () => {
        router.push(`/recipe/${recipe.id}`);
    };

    return (
        <div className="bg-white rounded-lg p-4 md:p-6 w-full h-full flex flex-col justify-between">
            <div className="flex flex-col">
                <h1 className="text-5xl font-bold text-gray-900 pb-2">{recipe.name}</h1>
                <p className="text-base font-normal text-gray-600">{recipe.instructions}</p>
                <ul className="mt-4">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300">{ingredient}</li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-end mt-4">
                <button
                    onClick={handleDetailClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
                >
                    Detail
                </button>
            </div>
        </div>
    );
};

export default RecipeComponent;