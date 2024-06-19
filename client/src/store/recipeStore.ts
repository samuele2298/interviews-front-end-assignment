import create from 'zustand';
import axios from 'axios';

//const URL = 'http://localhost:3000';
const URL = 'api';
const DOWNLOAD_FOLDER = '../../src/upload_images';
const RECIPE_LIMIT = 10;

import {
    CuisineType,
    DifficultyType,
    DietType,
    RecipeType,
    RecipeFilterType,
    CommentType
} from '../types/api';

import { recipeStoreType } from '../types/state';
import { RecipeFormType, CommentFormType, } from '../types/form';

export const useRecipeStore = create<recipeStoreType>((set, get) => ({
    recipes: [] as RecipeType[],
    recipe: null,
    cuisines: [] as CuisineType[],
    difficulties: [] as DifficultyType[],
    diets: [] as DietType[],
    isLoadingRecipes: true,


    setRecipes: (recipes) => set({ recipes }),
    setRecipe: (recipe) => set({ recipe }),
    setCuisines: (cuisines: CuisineType[]) => set({ cuisines }),
    setDifficulties: (difficulties) => set({ difficulties }),
    setDiets: (diets) => set({ diets }),

    //GET
    async getRecipes(recipeRequest: RecipeFilterType) {
        const { setRecipes } = get();
        axios
            .get(`${URL}/recipes`, { params: { recipeRequest } })
            .then(({ data }) => setRecipes(data))
            .catch((error) => console.error('Error fetching recipes:', error))
            .finally(() => set({ isLoadingRecipes: false }));

    },

    async getRecipe(id: string) {
        try {
            const response = await axios.get(`${URL}/recipes/${id}`);
            const recipe = response.data;

            const commentsResponse = await axios.get(`${URL}/recipes/${id}/comments`);
            const comments = commentsResponse.data;

            // Merge comments into recipe object
            recipe.comments = comments;

            set({ recipe });
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
            if (typeof recipeForm.image === 'string') {
                formData.append('image', recipeForm.image);
            } else {
                formData.append('image', recipeForm.image);
            }

            axios
                .post(`${URL}/recipes`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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

// Usage example:
// In your component where you want to use the store:
// import { useRecipeStore } from './store';

// Example usage in a React component:
/*
const MyComponent = () => {
    const { recipes, getRecipes, cuisines, getCuisines } = useRecipeStore();

    useEffect(() => {
        // Fetch recipes on component mount
        getRecipes(1); // Fetch recipes from page 1
        getCuisines(); // Fetch cuisines
    }, []);

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>{recipe.name}</li>
                ))}
            </ul>
            <h1>Cuisines</h1>
            <ul>
                {cuisines.map(cuisine => (
                    <li key={cuisine.id}>{cuisine.name}</li>
                ))}
            </ul>
        </div>
    );
};
*/

