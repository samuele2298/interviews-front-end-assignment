import { useRecipeStore } from '@/src/store/recipeStore';
import { RecipeFormType, CommentFormType } from '../types/form';

export const useFormActions = () => {
    const { addRecipe, addComment } = useRecipeStore();

    const submitRecipe = (recipeForm: RecipeFormType) => {
        addRecipe(recipeForm);
    };

    const submitComment = (recipeId: string, commentForm: CommentFormType) => {
        addComment(recipeId, commentForm);
    };

    return { submitRecipe, submitComment };
};
