'use client'

import Recipe from '@/src/components/Recipe';
import Navbar from '@/src/components/Navbar';
import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRecipes } from '@/src/hooks/useRecipes';

const RecipViewPage = () => {
    const { recipes, isLoading, loadMore } = useRecipes();
    const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

    // Calculate the total number of recipes
    const totalRecipes = recipes.length;

    // Effect to handle pagination when the current recipe index changes
    useEffect(() => {
        if (currentRecipeIndex === totalRecipes - 1) {
            loadMore();
        }
    }, [currentRecipeIndex, totalRecipes, loadMore]);


    const goToPreviousRecipe = () => {
        setCurrentRecipeIndex(currentRecipeIndex === 0 ? totalRecipes - 1 : currentRecipeIndex - 1);
    };

    const goToNextRecipe = () => {
        setCurrentRecipeIndex((currentRecipeIndex + 1) % totalRecipes);
    };


    return (
        <div className="w-full flex flex-col h-screen">
            <Navbar />

            <main className=" flex-1 w-full h-full bg-gray-100 flex justify-center items-center">
                <div className=" w-full h-full flex items-center justify-center">
                    {isLoading ? (
                        <p className="text-xl text-gray-600">Loading recipes...</p>
                    ) : (
                        <div className="w-full h-full bg-white  flex flex-col items-center relative justify-center">
                            {totalRecipes > 0 ? (
                                <>
                                    <FaChevronLeft
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-3xl text-orange-500 hover:text-orange-700"
                                        onClick={goToPreviousRecipe}
                                    />
                                    <Recipe recipe={recipes[currentRecipeIndex]} />
                                    <FaChevronRight
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-3xl text-orange-500 hover:text-orange-700"
                                        onClick={goToNextRecipe}
                                    />
                                </>
                            ) : (
                                <p className="text-gray-500 text-xl">No recipes present</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>

    );
};

export default RecipViewPage;

