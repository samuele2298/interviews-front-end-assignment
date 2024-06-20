import create from 'zustand';
import axios from 'axios';


import {
    RecipeType,
    RecipeFilterType,
} from '../types/api';



//const URL = 'http://localhost:3000';
const URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';
const LIMIT_SEARCH = 50;

export interface searchStoreType {
    //State
    filter: RecipeFilterType;
    searchResults: RecipeType[] | [];
    isLoading: Boolean,

    //Setter functions
    setFilter: (filter: RecipeFilterType) => void;
    setResults: (searchResults: RecipeType[]) => void;

    setLoading: (isLoading: Boolean) => void;

    //Getter functions
    getResults: () => Promise<void>;


}

export const useSearchStore = create<searchStoreType>((set, get) => ({
    filter: {
        page: 1,
        limit: LIMIT_SEARCH,
        q: 'pizza',
        cuisineId: '',
        difficultyId: '',
        dietId: '',
        expand: []
    },
    searchResults: [] as RecipeType[],


    isLoading: false,


    setFilter: (filter: RecipeFilterType) => set({ filter }),
    setResults: (searchResults: RecipeType[]) => set({ searchResults }),
    setLoading: (isLoading: Boolean) => set({ isLoading }),


    //GET
    async getResults() {
        const { filter, setResults } = get();
        axios
            .get(`${URL}/recipes`, { params: { filter } })
            .then(({ data }) => setResults(data))
            .catch((error) => console.error('Error fetching recipes:', error))
            .finally(() => set({ isLoading: false }));

    },

}));

