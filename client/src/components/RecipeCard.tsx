'use client'

import React, { useEffect } from 'react';
import { CuisineType, DietType, DifficultyType, RecipeType } from '../types/api';
import { useRouter } from 'next/navigation';
import { useRecipeStore } from '@/src/store/recipeStore';

interface RecipeProps {
    recipe: RecipeType;
}

const RecipeSearchCard: React.FC<RecipeProps> = ({ recipe }) => {
    const { getDiets, getCuisines, getDifficulties, diets, cuisines, difficulties } = useRecipeStore();
    const router = useRouter();

    useEffect(() => {
        getDiets();
        getCuisines();
        getDifficulties();
    }, [getDiets, getCuisines, getDifficulties]);

    const handleDetailClick = () => {
        router.push(`/recipe/${recipe.id}`);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg overflow-hidden flex">
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
            <div className="w-2/3 p-4 flex flex-col justify-between">
                {/* Title */}
                <h3 className="text-3xl  font-bold text-gray-900 mb-4">{recipe.name}</h3>
                {/* Tags (Cuisine, Difficulty, Diet) */}
                <div className="flex flex-wrap mb-4">
                    <span
                        className="bg-white text-orange-500 px-4 py-1 rounded-full shadow-lg hover:scale-105 transform transition duration-300 mr-2 mb-2"
                    >
                        Cuisine: {cuisines.find((cuisine: CuisineType) => cuisine.id === recipe.cuisineId)?.name}
                    </span>
                    <span
                        className="bg-white text-orange-500  px-4 py-1  rounded-full shadow-lg hover:scale-105 transform transition duration-300 mr-2 mb-2"
                    >
                        Difficulty: {difficulties.find((difficulty: DifficultyType) => difficulty.id === recipe.difficultyId)?.name}
                    </span>
                    <span
                        className="bg-white text-orange-500 px-4 py-1  rounded-full shadow-lg  hover:scale-105 transform transition duration-300 mr-2 mb-2"
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
                                className="bg-white text-orange-500 px-4 py-1  rounded-full shadow-lg hover:scale-105 transform transition duration-300 mr-2 mb-2"
                            >
                                {ingredient}
                            </span>
                        ))}
                    </div>
                </div>



                {/* Detail Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleDetailClick}
                        className="bg-orange-500  text-white px-8 py-3 font-bold rounded-full shadow-md hover:scale-105 transform transition duration-300 mt-6 md:mt-0"

                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeSearchCard;
