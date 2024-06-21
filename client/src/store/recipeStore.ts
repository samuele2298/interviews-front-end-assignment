import create from 'zustand';
import axios from 'axios';
import { RecipeFormType, CommentFormType, } from '../types/form';
import { recipeStoreType } from '@/src/types/state';
import {
    CuisineType,
    DifficultyType,
    DietType,
    RecipeType,
    CommentType,
} from '../types/api';


//SELECT THE SERVER 
//const URL = 'http://localhost:3000';
const URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';
const RECIPE_PER_PAGE_LIMIT = 10;

export const useRecipeStore = create<recipeStoreType>((set, get) => ({
    page: 1, //Start with the first page
    recipe: null,
    recipes: [] as RecipeType[],
    cuisines: [] as CuisineType[],
    difficulties: [] as DifficultyType[],
    diets: [] as DietType[],
    hasMore: true,
    isLoading: true,


    setPage: (page) => set({ page }),
    setRecipes: (recipes) => set({ recipes }),
    setRecipe: (recipe) => set({ recipe }),
    setCuisines: (cuisines: CuisineType[]) => set({ cuisines }),
    setDifficulties: (difficulties: DifficultyType[]) => set({ difficulties }),
    setDiets: (diets: DietType[]) => set({ diets }),

    setHasMore: (hasMore) => set({ hasMore }),
    setIsLoading: (isLoading) => set({ isLoading }),

    //GET
    async getRecipes() {
        const { page, setRecipes } = get();
        axios
            .get(`${URL}/recipes?_page=${page}&_per_page=${RECIPE_PER_PAGE_LIMIT}`)
            .then(({ data }) => setRecipes(data))
            .catch((error) => console.error('Error fetching recipes:', error))
            .finally(() => set({ isLoading: false }));
    },

    async getRecipe(id: string) {
        const { setRecipe } = get();

        try {
            const response = await axios.get(`${URL}/recipes/${id}`);
            const recipe = response.data;

            const commentsResponse = await axios.get(`${URL}/recipes/${id}/comments`);
            const comments: CommentType[] = commentsResponse.data;

            // Merge comments into recipe object
            recipe.comments = comments;

            setRecipe(recipe);

        } catch (error) {
            console.error('Error fetching recipe:', error);
        }

    },

    async getDifficulties() {
        const { setDifficulties } = get();
        axios
            .get(`${URL}/difficulties`)
            .then(({ data }) => setDifficulties(data))
            .catch((error) => console.error('Error fetching difficulties:', error))
    },

    async getCuisines() {
        const { setCuisines } = get();
        axios
            .get(`${URL}/cuisines`)
            .then(({ data }) => setCuisines(data))
            .catch((error) => console.error('Error fetching cuisines:', error))
    },

    async getDiets() {
        const { setDiets } = get();
        axios
            .get(`${URL}/diets`)
            .then(({ data }) => setDiets(data))
            .catch((error) => console.error('Error fetching diets:', error))
    },

    //POST
    async addRecipe(recipeForm: RecipeFormType) {
        try {
            axios
                .post(`${URL}/recipes`, recipeForm,)
                .then(({ data }) => console.log('Recipe added successfully:', data))
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    },

    async addComment(recipeId: string, commentForm: CommentFormType) {
        axios
            .post(`${URL}/recipes/${recipeId}/comments`, commentForm)
            .then(({ data }) => console.log('Comment added successfully:', data))
            .catch((error) => console.error('Error adding comment:', error))
    },

}));


