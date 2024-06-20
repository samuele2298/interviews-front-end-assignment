'use client'
import React, { useEffect } from 'react';
import { RecipeType } from '../types/api';
import { useRouter } from 'next/navigation'; // Corrected import path for useRouter
import { useRecipeStore } from '@/store/recipeStore';

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
                        src={`/upload_images/${recipe.image}`}
                        alt={recipe.name}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>
            {/* Recipe Details */}
            <div className="w-2/3 p-6 flex flex-col justify-between">
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{recipe.name}</h3>
                {/* Tags (Cuisine, Difficulty, Diet) */}
                <div className="flex flex-wrap mb-4">
                    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        Cuisine: {cuisines.find(cuisine => cuisine.id === recipe.cuisineId)?.name}
                    </span>
                    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        Difficulty: {difficulties.find(difficulty => difficulty.id === recipe.difficultyId)?.name}

                    </span>
                    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        Diet:  {diets.find(diet => diet.id === recipe.dietId)?.name}
                    </span>
                </div>
                {/* Ingredients */}
                <div className="mb-4">
                    <h4 className="text-base font-semibold text-gray-900">Ingredients:</h4>
                    <ul className="list-disc pl-6">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="text-gray-700">{ingredient}</li>
                        ))}
                    </ul>
                </div>
                {/* Detail Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleDetailClick}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
                    >
                        View Recipe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeSearchCard;
