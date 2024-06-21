import create from 'zustand';
import axios from 'axios';
import { searchStoreType } from '@/src/types/state';
import {
    RecipeType,
    RecipeFilterType,
} from '../types/api';


//SELECT THE SERVER 
//const URL = 'http://localhost:3000';
const URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';


export const useSearchStore = create<searchStoreType>((set, get) => ({
    searchResults: [] as RecipeType[],

    setResults: (searchResults: RecipeType[]) => set({ searchResults }),

    //GET
    async getResults(filter: RecipeFilterType) {
        const { setResults } = get();
        const expandParam = filter._expand && Array.isArray(filter._expand) ? filter._expand.join(',') : '';

        axios
            .get(`${URL}/recipes?_page=${filter._page}&_limit=${filter._limit}&q=${filter.q}&cuisineId=${filter.cuisineId}&dietId=${filter.dietId}&difficultyId=${filter.difficultyId}&_expand=${expandParam}`)
            .then(({ data }) => setResults(data))
            .catch((error) => console.error('Error fetching search recipes:', error))

    },

}));

