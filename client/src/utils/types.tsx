// types.tsx

// Recipe type definition
export interface Recipe {
    id: string;
    name: string;
    ingredients: string[];
    instructions: string;
    cuisineId: string;
    dietId: string;
    difficultyId: string;
    image: string;
}

// Comment type definition
export interface Comment {
    id: string;
    recipeId: string;
    comment: string;
    rating: number;
    date: string;
}

// Cuisine type definition
export interface Cuisine {
    name: string;
}

// Difficulty type definition
export interface Difficulty {
    name: string;
}

// Diet type definition
export interface Diet {
    name: string;
}

// RecipeBook state and actions type definitions
export interface RecipeBookState {
    recipes: Recipe[];
    cuisines: Cuisine[];
    difficulties: Difficulty[];
    diets: Diet[];
    comments: Comment[];
    fetchRecipes: (params?: Record<string, any>) => Promise<void>;
    fetchRecipeById: (id: string, params?: Record<string, any>) => Promise<Recipe>;
    addRecipe: (data: FormData) => Promise<void>;
    fetchComments: (recipeId: string) => Promise<void>;
    addComment: (recipeId: string, commentData: { comment: string; rating: number; date: string }) => Promise<void>;
    fetchCuisines: () => Promise<void>;
    fetchDifficulties: () => Promise<void>;
    fetchDiets: () => Promise<void>;
}


