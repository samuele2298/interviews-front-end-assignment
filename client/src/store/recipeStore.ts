import create from 'zustand';
import axios from 'axios';

//const URL = 'http://localhost:3000';
const URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

const DOWNLOAD_FOLDER = '../../src/upload_images';
const LIMIT = 10;

import {
    CuisineType,
    DifficultyType,
    DietType,
    RecipeType,
    CommentType,
} from '../types/api';


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
    getImage: (imageName: string) => Promise<Blob>;
    getRecipe: (id: string) => void;

    addComment: (recipeId: string, commentForm: CommentFormType) => void;
    addRecipe: (recipe: RecipeFormType) => void;
}


import { RecipeFormType, CommentFormType, } from '../types/form';

export const useRecipeStore = create<recipeStoreType>((set, get) => ({
    page: 1,
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
            .get(`${URL}/recipes?_page=${page}&_per_page=${LIMIT}`)
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

    getDifficulties() {
        const { setDifficulties } = get();
        axios
            .get(`${URL}/difficulties`)
            .then(({ data }) => setDifficulties(data))
            .catch((error) => console.error('Error fetching difficulties:', error))
    },

    getCuisines() {
        const { setCuisines } = get();
        axios
            .get(`${URL}/cuisines`)
            .then(({ data }) => setCuisines(data))
            .catch((error) => console.error('Error fetching cuisines:', error))
    },

    getDiets() {
        const { setDiets } = get();
        axios
            .get(`${URL}/diets`)
            .then(({ data }) => setDiets(data))
            .catch((error) => console.error('Error fetching diets:', error))
    },

    async getImage(imageName) {
        try {
            const response = await axios.get(`${URL}/uploads/${imageName}`, { responseType: 'blob' });
            const blob = response.data;

            // Save the blob (image) to a specific folder with its name
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${DOWNLOAD_FOLDER}${imageName}`);
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            return blob;
        } catch (error) {
            console.error('Error fetching image:', error);
            return new Blob(); // Return an empty Blob on error
        }
    },



    //POST
    async addRecipe(recipeForm: RecipeFormType) {
        try {
            const formData = new FormData();
            formData.append('name', recipeForm.name);
            formData.append('ingredients', JSON.stringify(recipeForm.ingredients));
            formData.append('instructions', recipeForm.instructions);
            formData.append('cuisineId', recipeForm.cuisineId);
            formData.append('dietId', recipeForm.dietId);
            formData.append('difficultyId', recipeForm.difficultyId);
            formData.append('image', recipeForm.image);


            axios
                .post(`${URL}/recipes`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Use multipart/form-data for FormData
                    },
                })
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


