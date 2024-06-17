'use client'

// components/RecipeViewer.tsx

import React, { useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/home.css';
import Recipe from '../components/Recipe';
import useStore from '../store/test'; // Adjust the path to your zustand store

const recipesData = [
    {
        title: 'Recipe 1',
        description: 'Description of Recipe 1',
        ingredients: ['Ingredient 1', 'Ingredient 2'],
        instructions: ['Step 1', 'Step 2']
    },
    {
        title: 'Recipe 2',
        description: 'Description of Recipe 2',
        ingredients: ['Ingredient A', 'Ingredient B'],
        instructions: ['Step A', 'Step B']
    }
    // Add more recipes as needed
];

const RecipesPage = () => {
    const recipes = useStore(state => state.recipes);
    const currentRecipeIndex = useStore(state => state.currentRecipeIndex);
    const setCurrentRecipeIndex = useStore(state => state.setCurrentRecipeIndex);

    useEffect(() => {
        // Fetch recipes when component mounts

    }, []); // Empty dependency array ensures this effect runs only once on mount


    const goToPreviousRecipe = () => {
        setCurrentRecipeIndex(currentRecipeIndex === 0 ? recipesData.length - 1 : currentRecipeIndex - 1);
    };

    const goToNextRecipe = () => {
        setCurrentRecipeIndex((currentRecipeIndex + 1) % recipesData.length);
    };

    return (
        <div className="recipe-container">
            <div className="navigation">
                <FaChevronLeft onClick={goToPreviousRecipe} />
                <FaChevronRight onClick={goToNextRecipe} />
            </div>
            <div className="recipe">
                <Recipe recipe={recipes[currentRecipeIndex]} />
            </div>
        </div>
    );
};

export default RecipesPage;