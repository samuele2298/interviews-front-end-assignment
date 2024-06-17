// Recipe.tsx

// Recipe.tsx

import React from 'react';
import { Recipe as RecipeType } from '../utils/types'; // Importing the Recipe interface with an alias

interface RecipeProps {
    recipe: RecipeType; // Using the RecipeType alias here
}

const RecipeComponent: React.FC<RecipeProps> = ({ recipe }) => {
    return (
        <div>
            <h2>{recipe.name}</h2>
            <p>{recipe.instructions}</p>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeComponent;