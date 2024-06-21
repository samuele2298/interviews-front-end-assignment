import { useEffect } from 'react';
import { useRecipeStore } from '@/src/store/recipeStore';

export const useTags = () => {
    const { cuisines, difficulties, diets, getCuisines, getDifficulties, getDiets } = useRecipeStore();

    useEffect(() => {
        getCuisines();
        getDifficulties();
        getDiets();
    }, [getCuisines, getDifficulties, getDiets]);

    return { cuisines, difficulties, diets };
};
