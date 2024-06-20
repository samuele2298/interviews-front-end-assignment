'use client'

import Recipe from '@/components/Recipe';
import Navbar from '@/components/Navbar';
import { useRecipeStore } from '@/store/recipeStore';
import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const RecipViewPage = () => {
    const { recipes, getRecipes, isLoading, hasMore } = useRecipeStore();
    const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

    useEffect(() => {
        getRecipes();
    }, []);

    const loadMore = () => {
        if (hasMore && !isLoading) {
            getRecipes();
        }
    };

    const totalRecipes = recipes.length;

    const goToPreviousRecipe = () => {
        setCurrentRecipeIndex(currentRecipeIndex === 0 ? totalRecipes - 1 : currentRecipeIndex - 1);
    };

    const goToNextRecipe = () => {
        setCurrentRecipeIndex((currentRecipeIndex + 1) % totalRecipes);
    };

    useEffect(() => {
        // Load more recipes when reaching the last recipe
        if (currentRecipeIndex === totalRecipes - 1) {
            loadMore();
        }
    }, [currentRecipeIndex, totalRecipes]);

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

