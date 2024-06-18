'use client'

import React, { useEffect, useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/home.css';


const HomePage = () => {
    const { recipes, getRecipes } = useRecipeStore();

    useEffect(() => {
        getRecipes(1);
    }, [getRecipes]);


    const goToPreviousRecipe = () => {
        //setCurrentRecipeIndex(currentRecipeIndex === 0 ? recipesData.length - 1 : currentRecipeIndex - 1);
    };

    const goToNextRecipe = () => {
        //setCurrentRecipeIndex((currentRecipeIndex + 1) % recipesData.length);
    };

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h2>{recipe.name}</h2>
                        <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                        <p>Instructions: {recipe.instructions}</p>
                        <p>Image: {recipe.image}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
//<Recipe recipe={recipes[currentRecipeIndex]} />

export default HomePage;

