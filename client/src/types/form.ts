
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
    comment: string;
    rating: number;
    date: string;
}