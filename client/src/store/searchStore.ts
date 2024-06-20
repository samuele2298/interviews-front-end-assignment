import create from 'zustand';
import axios from 'axios';
import { searchStoreType } from '@/types/state';
import {
    RecipeType,
    RecipeFilterType,
} from '../types/api';

//const URL = 'http://localhost:3000';
const URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';
const LIMIT_SEARCH = 50;


export const useSearchStore = create<searchStoreType>((set, get) => ({
    filter: {
        _page: 1,
        _limit: LIMIT_SEARCH,
        q: 'pizza',
        cuisineId: '',
        difficultyId: '',
        dietId: '',
        _expand: []
    } as RecipeFilterType,
    searchResults: [] as RecipeType[],


    isLoading: false,


    setFilter: (filter: RecipeFilterType) => set({ filter }),
    setResults: (searchResults: RecipeType[]) => set({ searchResults }),
    setLoading: (isLoading: Boolean) => set({ isLoading }),


    //GET
    async getResults(filter: RecipeFilterType) {
        const { setResults } = get();
        console.log(filter);
        const expandParam = filter._expand && Array.isArray(filter._expand) ? filter._expand.join(',') : '';

        axios
            .get(`${URL}/recipes?_page=${filter._page}&_limit=${filter._limit}&q=${filter.q}&cuisineId=${filter.cuisineId}&dietId=${filter.dietId}&difficultyId=${filter.difficultyId}&_expand=${expandParam}`)
            .then(({ data }) => setResults(data))
            .catch((error) => console.error('Error fetching recipes:', error))
            .finally(() => set({ isLoading: false }));

    },

}));

