

import React, { useEffect } from 'react';
import { RecipeType } from '../types/api'; // Importing the Recipe interface with an alias
import { useRouter } from 'next/navigation'
import { useRecipeStore } from '@/store/recipeStore';

interface RecipeProps {
    recipe: RecipeType;
}

const RecipeDetailComponent: React.FC<RecipeProps> = ({ recipe }) => {
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

        <div className="bg-white rounded-lg p-2 md:p-16 w-full flex flex-col md:flex-row items-center justify-center">
            {/* Recipe Details */}
            <div className="md:w-2/3 md:pl-12 flex flex-col justify-center">
                {/* Recipe Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center md:text-left">
                    {recipe.name}
                </h1>
                {/* Tags (Cuisine, Difficulty, Diets) */}
                <div className="flex flex-wrap mb-6">
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
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow-md transition duration-300"
                    >
                        View Details
                    </button>
                </div>
            </div>
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

        </div>


    );
};

export default RecipeDetailComponent;