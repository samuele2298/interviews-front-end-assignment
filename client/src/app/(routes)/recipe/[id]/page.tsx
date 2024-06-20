'use client'

import Comments from "@/components/Comments";
import { useRecipeStore } from '@/store/recipeStore'; // Import your Zustand store
import { useEffect, useState } from "react";
import RecipeDetail from "@/components/RecipeDetail";
import AddComments from "@/components/AddComment";
import Navbar from "@/components/Navbar";

export default function DetailsPage({
    params: { id },
}: {
    params: {
        id: string;
    }
}) {

    const { getRecipe, recipe } = useRecipeStore(); // Destructure getRecipe from Zustand store
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
            <Navbar />

            <div className="min-h-screen bg-gray-100">
                <RecipeDetail recipe={recipe} />

                {/* Check if recipe.comments is empty or null */}
                {recipe.comments && recipe.comments.length > 0 ? (
                    <div className="mt-8">
                        <Comments comments={recipe.comments} />
                    </div>
                ) : (
                    <div className="mt-8 flex flex-col items-center justify-center">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">No comments yet</h2>
                        {/* Optionally, you can add a button or message to encourage adding comments */}
                        {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300">
                            Add a Comment
                        </button> */}
                    </div>
                )}
                {/* Add commment section */}

                <div className="min-h-screen">
                    <AddComments recipeId={id} />
                </div>
            </div>
        </div>
    );
}