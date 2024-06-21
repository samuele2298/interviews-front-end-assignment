'use client'


import RecipeDetail from "@/src/components/RecipeDetail";
import AddComments from "@/src/components/AddComment";
import Navbar from "@/src/components/Navbar";
import Skeleton from "@/src/components/Skeleton";
import Comments from "@/src/components/Comments";

import { useRecipeDetails } from '@/src/hooks/useRecipeDetails';

export default function DetailsPage({ params: { id }, }: { params: { id: string; } }) {

    const { recipe, isLoading } = useRecipeDetails(id);

    if (isLoading || !recipe) {
        return <Skeleton />;
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