
'use client'

import React, { useEffect } from 'react';
import { CuisineType, DietType, DifficultyType, RecipeType } from '../types/api';
import { useRouter } from 'next/navigation'
import { useTags } from '../hooks/useTags';

interface RecipeProps {
    recipe: RecipeType;
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
    const { difficulties, cuisines, diets } = useTags();

    const router = useRouter();


    const handleDetailClick = () => {
        router.push(`/recipe/${recipe.id}`);
    };

    return (

        <div className="bg-white rounded-lg ml-8 p-12 md:p-16 w-full flex flex-col md:flex-row items-center justify-center">

            {/* Recipe Image */}
            <div className="md:w-1/3 mb-4 md:mb-0 flex justify-center">
                <div className="relative w-full h-0" style={{ paddingBottom: '100%' }}>
                    <img
                        src={`/recipe_images/${recipe.image}`}
                        alt={recipe.name}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>

            {/* Recipe Details */}
            <div className="md:w-2/3 md:pl-12 flex flex-col justify-center">

                {/* Recipe Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center md:text-left">
                    {recipe.name}
                </h1>
                {/* Tags (Cuisine, Difficulty, Diets) */}
                <div className="flex flex-wrap mb-6">
                    <span
                        className="bg-white text-orange-500 px-4 py-1 md:py-4 rounded-full shadow-lg hover:scale-105 transform transition duration-300 mr-2 mb-2"
                    >
                        Cuisine: {cuisines.find((cuisine: CuisineType) => cuisine.id === recipe.cuisineId)?.name}
                    </span>
                    <span
                        className="bg-white text-orange-500  px-4 py-1 md:py-4 rounded-full shadow-lg hover:scale-105 transform transition duration-300 mr-2 mb-2"
                        style={{ background: 'white', color: 'orange' }}
                    >
                        Difficulty: {difficulties.find((difficulty: DifficultyType) => difficulty.id === recipe.difficultyId)?.name}
                    </span>
                    <span
                        className="bg-white text-orange-500  px-4 py-1 md:py-4 rounded-full shadow-lg  hover:scale-105 transform transition duration-300 mr-2 mb-2"
                        style={{ background: 'white', color: 'orange' }}
                    >
                        Diet: {diets.find((diet: DietType) => diet.id === recipe.dietId)?.name}
                    </span>
                </div>
                {/* Ingredients */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Ingredients:</h2>
                    <div className="flex flex-wrap">
                        {recipe.ingredients.map((ingredient, index) => (
                            <span
                                key={index}
                                className="bg-white text-orange-500 px-4 py-1 md:py-4 rounded-full shadow-lg hover:scale-105 transform transition duration-300 mr-2 mb-2"
                            >
                                {ingredient}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Instructions */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Instructions:</h2>
                    <ul className="list-disc pl-6">
                        <li className="text-base text-gray-600 mb-2">
                            {recipe.instructions.split('. ')[0]}

                        </li>
                        <li>..</li>
                    </ul>
                </div>

                {/* Detail Button */}
                <div className="flex justify-start">
                    <button
                        onClick={handleDetailClick}
                        className="bg-orange-500 text-white text-xl font-bold px-8 py-4 rounded-full shadow-md hover:scale-105 transform transition duration-300"
                    >
                        View Details
                    </button>
                </div>

            </div>
        </div>




    );
};

export default Recipe;