import React, { useEffect } from 'react';
import { RecipeType } from '../types/api'; // Importing the Recipe interface with an alias
import { useRecipeStore } from '@/store/recipeStore';

interface RecipeProps {
    recipe: RecipeType;
}

const RecipeDetailComponent: React.FC<RecipeProps> = ({ recipe }) => {
    const { getDiets, getCuisines, getDifficulties, diets, cuisines, difficulties } = useRecipeStore();

    useEffect(() => {
        getDiets();
        getCuisines();
        getDifficulties();
    }, [getDiets, getCuisines, getDifficulties]);


    return (
        <div className="bg-white rounded-lg p-6 md:p-16 w-full flex flex-col md:flex-row items-center justify-center">

            {/* Recipe Details */}
            <div className="md:w-2/3 md:pl-2 flex flex-col justify-center">

                {/* Recipe Title */}
                <h1 className="text-6xl md:text-6xl font-bold text-gray-900 mb-6 text-center md:text-left">
                    {recipe.name}
                </h1>
                {/* Tags (Cuisine, Difficulty, Diets) */}
                <div className="flex flex-wrap mb-6">
                    <span
                        className="bg-white text-orange-500 px-4 py-1 md:py-4 rounded-full shadow-lg hover:scale-105 transform transition duration-300 mr-2 mb-2"
                    >
                        Cuisine: {cuisines.find(cuisine => cuisine.id === recipe.cuisineId)?.name}
                    </span>
                    <span
                        className="bg-white text-orange-500  px-4 py-1 md:py-4 rounded-full shadow-lg hover:scale-105 transform transition duration-300 mr-2 mb-2"
                    >
                        Difficulty: {difficulties.find(difficulty => difficulty.id === recipe.difficultyId)?.name}
                    </span>
                    <span
                        className="bg-white text-orange-500 px-4 py-1 md:py-4 rounded-full shadow-lg  hover:scale-105 transform transition duration-300 mr-2 mb-2"
                    >
                        Diet: {diets.find(diet => diet.id === recipe.dietId)?.name}
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
                        {recipe.instructions.split('. ').map((instruction, index) => (
                            <li key={index} className="text-base text-gray-600 mb-2">
                                {instruction.length > 60 ? `${instruction.substring(0, 60)}...` : instruction}
                            </li>
                        ))}
                    </ul>
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