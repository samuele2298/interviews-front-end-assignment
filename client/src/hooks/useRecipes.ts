import { useEffect } from 'react';
import { useRecipeStore } from '@/src/store/recipeStore';

export const useRecipes = () => {
    const { recipes, isLoading, getRecipes, hasMore } = useRecipeStore();

    useEffect(() => {
        getRecipes(); // Fetch recipes on initial render
    }, [getRecipes]);

    const loadMore = () => {
        if (hasMore && !isLoading) {
            getRecipes();
        }
    };

    return { recipes, isLoading, loadMore };
};
