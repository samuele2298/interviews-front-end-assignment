import create from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Recipe, Comment, Cuisine, Difficulty, Diet } from '../utils/types';

// API base URL
const URL = 'http://localhost:3000';

interface Filter {
    q: string;
    cuisineId: string;
    difficultyId: string;
    dietId: string;
}

interface State {
    filter: Filter;
    recipes: Recipe[];
    cuisines: Cuisine[];
    difficulties: Difficulty[];
    diets: Diet[];
    loading: boolean;
    searchResults: Recipe[];
    comments: Comment[];
}

interface Actions {
    getRecipes: (queryParams?: Record<string, any>) => Promise<void>;
    getCuisines: () => Promise<void>;
    getDifficulties: () => Promise<void>;
    getDiets: () => Promise<void>;
    addRecipe: (recipe: Omit<Recipe, 'id'>) => Promise<void>;
    getCommentsByRecipeId: (id: string) => Promise<void>;
    addComment: (id: string, commentData: Omit<Comment, 'id'>) => Promise<void>;
    uploadImage: (imageName: string) => Promise<void>;
    getRecipeById: (id: string, expand?: string[]) => Promise<void>;

}

export const useRecipeStore = create<State & Actions>((set) => ({
    filter: {
        q: '',
        cuisineId: '',
        difficultyId: '',
        dietId: '',
    },
    recipes: [],
    cuisines: [],
    difficulties: [],
    diets: [],
    loading: false,
    searchResults: [],
    comments: [],

    getRecipes: async (queryParams = {}) => { },

    /*    setLoading: (loading: boolean) =>
            set({ loading }, false, "set loading: " + loading),
    
    // Actions
    getRecipes: async (queryParams = {}) => {
        try {
            set({ loading: true });
            const { data } = await axios.get<Recipe[]>(`${URL}/recipes`, {
                params: { ...set().filter, ...queryParams }
            });
            set({ recipes: data, loading: false });
        } catch (error) {
            toast.error('Error fetching recipes');
            set({ loading: false });
        }
    }, */


    getCuisines: async () => {
        try {
            set({ loading: true });
            const { data } = await axios.get<Cuisine[]>(`${URL}/cuisines`);
            set({ cuisines: data });
        } catch (error) {
            toast.error('Error fetching cuisines');
        } finally {
            set({ loading: false });
        }
    },

    getDifficulties: async () => {
        try {
            set({ loading: true });
            const { data } = await axios.get<Difficulty[]>(`${URL}/difficulties`);
            set({ difficulties: data });
        } catch (error) {
            toast.error('Error fetching difficulties');
        } finally {
            set({ loading: false });
        }
    },

    getDiets: async () => {
        try {
            set({ loading: true });
            const { data } = await axios.get<Diet[]>(`${URL}/diets`);
            set({ diets: data });
        } catch (error) {
            toast.error('Error fetching diets');
        } finally {
            set({ loading: false });
        }
    },

    addRecipe: async (recipe: Omit<Recipe, 'id'>) => {
        try {
            set({ loading: true });
            const { data } = await axios.post<Recipe>(`${URL}/recipes`, recipe);
            set((state) => ({
                recipes: [...state.recipes, data],
            }));
            toast.success('Recipe added successfully');
        } catch (error) {
            toast.error('Error adding recipe');
        } finally {
            set({ loading: false });
        }
    },

    getCommentsByRecipeId: async (id: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get<Comment[]>(`${URL}/recipes/${id}/comments`);
            set({ comments: data });
        } catch (error) {
            toast.error(`Error fetching comments for recipe with id ${id}`);
        } finally {
            set({ loading: false });
        }
    },

    addComment: async (id: string, commentData: Omit<Comment, 'id'>) => {
        try {
            set({ loading: true });
            const { data } = await axios.post<Comment>(`${URL}/recipes/${id}/comments`, commentData);
            set((state) => ({
                comments: [...state.comments, data],
            }));
            toast.success('Comment added successfully');
        } catch (error) {
            toast.error('Error adding comment');
        } finally {
            set({ loading: false });
        }
    },

    uploadImage: async (imageName: string) => {
        try {
            set({ loading: true });
            const { data } = await axios.get<string>(`${URL}/uploads/${imageName}`);
            // Handle image data as needed
            console.log('Image data:', data);
        } catch (error) {
            toast.error(`Error fetching image ${imageName}`);
        } finally {
            set({ loading: false });
        }
    },

    getRecipeById: async (id: string, expand?: string[]) => {
        try {
            set({ loading: true });
            const queryParams = expand ? { _expand: expand.join(',') } : {};
            const { data } = await axios.get<Recipe>(`${URL}/recipes/${id}`, { params: queryParams });
            set((state) => ({
                recipes: state.recipes.map((recipe) => (recipe.id === id ? data : recipe)),
            }));
        } catch (error) {
            toast.error(`Error fetching recipe with id ${id}`);
        } finally {
            set({ loading: false });
        }
    },
}));
