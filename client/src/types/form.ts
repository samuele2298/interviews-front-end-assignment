
export interface RecipeFormType {
    name: string;
    ingredients: string[];
    instructions: string;
    cuisineId: string;
    dietId: string;
    difficultyId: string;
    image: File | string;
}

export interface CommentFormType {
    recipeId: string
    comment: string;
    rating: number;
    date: string;
}