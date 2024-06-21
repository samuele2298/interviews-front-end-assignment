'use client'

import Comments from "@/components/Comments";
import { useRecipeStore } from '@/store/recipeStore'; // Import your Zustand store
import { useEffect, useState } from "react";
import RecipeDetail from "@/components/RecipeDetail";
import AddComments from "@/components/AddComment";
import Navbar from "@/components/Navbar";
import Skeleton from "@/components/Skeleton";

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




    if (isLoading || !recipe) {
        return (

            <Skeleton />
        );
    }


    return (
        <div>
            <Navbar />

            <div className="bg-gray-100">
                <RecipeDetail recipe={recipe} />
                <div className="bg-gray-100">
                    {/* Check if recipe.comments is empty or null */}
                    {recipe.comments && recipe.comments.length > 0 ? (
                        <div className="mt-8 flex flex-col md:flex-row md:items-start">
                            <div className="md:w-2/4">
                                <Comments comments={recipe.comments} />
                            </div>
                            <div className="md:w-2/4 mt-8 md:mt-0 md:ml-4">
                                <AddComments recipeId={id} />
                            </div>
                        </div>
                    ) : (
                        <div className="mt-8 flex flex-col items-center justify-center">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">No comments yet</h2>
                            <div className="mt-4">
                                <AddComments recipeId={id} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>




    );
}