import {
    CuisineType,
    DifficultyType,
    DietType,
    CommentType,
    RecipeType,
} from "./api";

export interface recipeStoreType {
    //State
    recipes: RecipeType[] | [];
    cuisines: CuisineType[] | [];
    difficulties: DifficultyType[] | [];
    diets: DietType[] | [];
    comments: CommentType[] | [];


    //Setter functions
    setRecipes: (recipes: RecipeType[]) => void;
    setCuisines: (cuisines: CuisineType[]) => void;
    setDifficulties: (difficulties: DifficultyType[]) => void;
    setDiets: (diets: DietType[]) => void;
    setComments: (comments: CommentType[]) => void;


    //Getter functions
    getDifficulties: () => void;
    getCuisines: () => void;
    getDiets: () => void;
    getRecipes: (page: number) => Promise<void>;
    getCommentsByRecipeId: (recipeId: string) => Promise<void>;
    getImage: (imageName: string) => Promise<Blob>;


}

