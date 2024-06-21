import {
    CuisineType,
    DifficultyType,
    DietType,
    RecipeType,
    RecipeFilterType,
} from "./api";

import { CommentFormType, RecipeFormType } from "./form";

export interface recipeStoreType {
    //State
    page: Number
    recipe: RecipeType | null;
    recipes: RecipeType[] | [];
    cuisines: CuisineType[] | [];
    difficulties: DifficultyType[] | [];
    diets: DietType[] | [];
    hasMore: Boolean,
    isLoading: Boolean,


    //Setter functions
    setPage: (page: Number) => void;
    setRecipe: (recipe: RecipeType) => void;
    setRecipes: (recipes: RecipeType[]) => void;
    setCuisines: (cuisines: CuisineType[]) => void;
    setDifficulties: (difficulties: DifficultyType[]) => void;
    setDiets: (diets: DietType[]) => void;
    setHasMore: (hasMore: Boolean) => void;
    setIsLoading: (isLoading: Boolean) => void;


    //Getter functions
    getDifficulties: () => void;
    getCuisines: () => void;
    getDiets: () => void;
    getRecipes: () => Promise<void>;
    getRecipe: (id: string) => void;

    //Add functions
    addComment: (recipeId: string, commentForm: CommentFormType) => void;
    addRecipe: (recipe: RecipeFormType) => void;
}


export interface searchStoreType {
    //State
    searchResults: RecipeType[] | [];

    //Setter functions
    setResults: (searchResults: RecipeType[]) => void;

    //Getter functions
    getResults: (filter: RecipeFilterType) => Promise<void>;


}
