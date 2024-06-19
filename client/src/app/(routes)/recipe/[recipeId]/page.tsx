'use client'

import Recipe from "@/components/Recipe";
import Comments from "@/components/Comments";
import { useRecipeStore } from '@/store/recipeStore'; // Import your Zustand store
import { useEffect, useState } from "react";

export default function DetailsPage({
    params: { id },
}: {
    params: {
        id: string;
    }
}) {

    const { recipe, getRecipe } = useRecipeStore(); // Destructure getRecipe from Zustand store
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch recipe details when id changes or component mounts
        setIsLoading(true); // Set loading to true while fetching
        try {
            getRecipe(id);
            if (recipe != null)
                setIsLoading(false); // Set loading to false on error
            else
                console.error('Error fetching recipe:');
            setIsLoading(false); // Set loading to false on error

            // Set loading to false after successful fetch
        } catch (error) {
            console.error('Error fetching recipe:', error);
            setIsLoading(false); // Set loading to false on error
        }
    }, [id, getRecipe]);


    if (isLoading) {
        return <p>Loading...</p>; // Show loading indicator while fetching recipe
    }

    if (!recipe) {
        return <p>Recipe not found</p>; // Optional: handle case where recipe is not found
    }
    return (
        <div>
            <h1>Recipe Details</h1>
            <Recipe recipe={recipe} />
            <Comments recipeId={id} comments={recipe.comments} />

        </div>
    );
}