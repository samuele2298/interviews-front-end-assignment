

// Define a type for the expand parameter
type ExpandType = 'difficulty' | 'cuisine' | 'diet';

// Define the interface for the recipeGet filtering parameters
export interface RecipeFilterType {
    _page?: number;
    _limit?: number;
    q?: string;
    cuisineId?: string;
    difficultyId?: string;
    dietId?: string;
    _expand?: ExpandType[];
}

export interface DietType {
    id: string;
    name: string;
}

export interface DifficultyType {
    id: string;
    name: string;
}

export interface CuisineType {
    id: string;
    name: string;
}

export type IngredientType = string;

export interface CommentType {
    id: string;
    recipeId: string;
    comment: string;
    rating: number;
    date: string;
}

export interface RecipeType {
    id: string;
    name: string;
    ingredients: string[];
    instructions: string;
    cuisineId: string;
    dietId: string;
    difficultyId: string;
    image: string;
    comments: CommentType[];


    //Optional type for the expand_  
    difficulty?: DifficultyType;
    diet?: DietType;
    cuisine?: CuisineType;
}

