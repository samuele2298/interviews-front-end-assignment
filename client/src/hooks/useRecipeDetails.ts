import { useEffect } from 'react';
import { useRecipeStore } from '@/src/store/recipeStore';

export const useRecipeDetails = (id: string) => {
    const { recipe, isLoading, getRecipe } = useRecipeStore();

    useEffect(() => {
        if (id) {
            getRecipe(id);
        }
    }, [id, getRecipe]);

    return { recipe, isLoading };
};