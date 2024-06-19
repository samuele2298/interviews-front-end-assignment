import {
    CuisineType,
    DifficultyType,
    DietType,
    CommentType,
    RecipeType,
    RecipeFilterType,
} from "./api";
import { CommentFormType, RecipeFormType } from "./form";

export interface recipeStoreType {
    //State
    recipes: RecipeType[] | [];
    recipe: RecipeType | null;
    cuisines: CuisineType[] | [];
    difficulties: DifficultyType[] | [];
    diets: DietType[] | [];
    isLoadingRecipes: Boolean,


    //Setter functions
    setRecipes: (recipes: RecipeType[]) => void;
    setRecipe: (recipe: RecipeType) => void;
    setCuisines: (cuisines: CuisineType[]) => void;
    setDifficulties: (difficulties: DifficultyType[]) => void;
    setDiets: (diets: DietType[]) => void;

    //Getter functions
    getDifficulties: () => void;
    getCuisines: () => void;
    getDiets: () => void;
    getRecipes: (filter: RecipeFilterType) => Promise<void>;
    getImage: (imageName: string) => Promise<Blob>;
    getRecipe: (id: string) => void;

    addComment: (recipeId: string, commentForm: CommentFormType) => void;
    addRecipe: (recipe: RecipeFormType) => void;
}

