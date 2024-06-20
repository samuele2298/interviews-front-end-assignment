

import React, { useEffect } from 'react';
import { RecipeType } from '../types/api'; // Importing the Recipe interface with an alias
import { useRouter } from 'next/navigation'
import { useRecipeStore } from '@/store/recipeStore';

interface RecipeProps {
    recipe: RecipeType;
}

const RecipeComponent: React.FC<RecipeProps> = ({ recipe }) => {
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
        <div className="flex flex-wrap md:flex-nowrap items-center p-4 md:p-8">
            {/* Recipe Image */}
            <div className="w-full md:w-1/2 lg:w-1/2 mb-4 md:mb-0 flex justify-center">
                <div className="relative w-full h-0" style={{ paddingBottom: '100%' }}>
                    <img
                        src={`/upload_images/${recipe.image}`}
                        alt={recipe.name}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>
            {/* Recipe Details */}
            <div className="w-full md:w-1/2 lg:w-1/2 md:pl-8 flex flex-col justify-center">
                {/* Recipe Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center md:text-left">
                    {recipe.name}
                </h1>
                {/* Tags (Cuisine, Difficulty, Diets) */}
                <div className="flex flex-wrap md:flex-row mb-6 justify-center md:justify-start">
                    <span
                        className="bg-orange-500 text-white px-6 py-2 md:py-4 rounded-full shadow-md hover:scale-105 transform transition duration-300 mr-2 mb-2"
                        style={{ background: 'orange', color: 'white' }}
                    >
                        Cuisine: {cuisines.find(cuisine => cuisine.id === recipe.cuisineId)?.name}
                    </span>
                    <span
                        className="bg-orange-500 text-white px-6 py-2 md:py-4 rounded-full shadow-md hover:scale-105 transform transition duration-300 mr-2 mb-2"
                        style={{ background: 'orange', color: 'white' }}
                    >
                        Difficulty: {difficulties.find(difficulty => difficulty.id === recipe.difficultyId)?.name}
                    </span>
                    <span
                        className="bg-orange-500 text-white px-6 py-2 md:py-4 rounded-full shadow-md hover:scale-105 transform transition duration-300 mr-2 mb-2"
                        style={{ background: 'orange', color: 'white' }}
                    >
                        Diet: {diets.find(diet => diet.id === recipe.dietId)?.name}
                    </span>
                </div>
                {/* Ingredients */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Ingredients:</h2>
                    <ul className="list-disc pl-6">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="text-gray-700">{ingredient}</li>
                        ))}
                    </ul>
                </div>
                {/* Instructions */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Instructions:</h2>
                    <p className="text-base text-gray-600">{recipe.instructions}</p>
                </div>
                {/* Detail Button */}
                <div className="flex justify-start">
                    <button
                        onClick={handleDetailClick}
                        className="bg-white text-orange-500 px-8 py-4 rounded-full shadow-md hover:scale-105 transform transition duration-300"
                        style={{ background: 'orange', color: 'white' }}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>






    );
};

export default RecipeComponent;