'use client'
import { useState, useEffect } from 'react';
import { useSearchStore } from '@/store/searchStore'; // Adjust import path based on your project structure
import { RecipeFilterType } from '@/types/api';
import Navbar from '@/components/Navbar';
import RecipeSearchCard from '@/components/RecipeSearchCard';
import { useRecipeStore } from '@/store/recipeStore';
//import '@/styles/style.css';

const RecipesSearchPage = () => {
    const { searchResults, getResults, filter, setFilter } = useSearchStore();
    const { difficulties, diets, cuisines, getCuisines, getDiets, getDifficulties } = useRecipeStore();

    const [filters, setFilters] = useState<RecipeFilterType>(filter);

    useEffect(() => {
        // Initial fetches for filters
        getCuisines();
        getDiets();
        getDifficulties();

        getResults(filters);

    }, [getCuisines, getDiets, getDifficulties, filters, getResults]);


    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Update setFilter directly with the new filter value
        setFilters((prevFilters: RecipeFilterType) => ({
            ...prevFilters,
            [name]: value,
        }));

        //setFilter(filters)
    };

    const handleSearch = () => {
        getResults(filters);
    };

    const handleReset = () => {

        setFilters({
            _page: 1,
            _limit: 10,
            q: '',
            cuisineId: '',
            dietId: '',
            difficultyId: '',
            _expand: [],
        });
        setFilter({
            _page: 1,
            _limit: 10,
            q: '',
            cuisineId: '',
            dietId: '',
            difficultyId: '',
            _expand: [],
        });
    };

    return (
        <div>
            <Navbar />
            <div className="flex">
                {/* Left Section: Search Filters */}
                <div className="w-1/4 p-4 border-r border-gray-300">
                    <h2 className="text-xl font-semibold mb-4">Search Filters</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="search" className="block font-semibold">Search</label>
                            <input
                                type="text"
                                id="search"
                                name="q"
                                value={filters.q}
                                onChange={handleFilterChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                            />
                        </div>


                        <div>

                            <label className="block font-semibold">Cuisine Preference</label>
                            {cuisines.map(cuisine => (
                                <div key={cuisine.name} className="flex items-center space-x-2 ml-4">
                                    <input
                                        type="checkbox"
                                        id={cuisine.id}
                                        name="cuisineId"
                                        value={cuisine.id}
                                        checked={filters.cuisineId === cuisine.id}
                                        onChange={handleFilterChange}

                                        className="text-blue-500 focus:ring-blue-500 h-4 w-4 rounded border-gray-300"
                                    />
                                    <label>{cuisine.name}</label>
                                </div>
                            ))}
                        </div>

                        <div>

                            <label className="block font-semibold">Diet Preference</label>
                            {diets.map(diet => (
                                <div key={diet.name} className="flex items-center space-x-2 ml-4">
                                    <input
                                        type="checkbox"
                                        id={diet.id}
                                        name="dietId"
                                        value={diet.id}
                                        checked={filters.dietId === diet.id}
                                        onChange={handleFilterChange}
                                        className="text-blue-500 focus:ring-blue-500 h-4 w-4 rounded border-gray-300"
                                    />
                                    <label >{diet.name}</label>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label className="block font-semibold">Difficulty Level</label>
                            {difficulties.map(difficulty => (
                                <div key={difficulty.id} className="flex items-center space-x-2 ml-4">
                                    <input
                                        type="checkbox"
                                        id={difficulty.id}
                                        name="difficultyId"
                                        value={difficulty.id}
                                        checked={filters.difficultyId === difficulty.id}
                                        onChange={handleFilterChange}
                                        className="text-blue-500 focus:ring-blue-500 h-4 w-4 rounded border-gray-300"
                                    />
                                    <label >{difficulty.name}</label>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={handleSearch}
                            className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        >
                            Search
                        </button>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        >
                            Reset
                        </button>
                    </div>

                </div>
                {/* Right Section: Vertically Stacked Recipes List */}
                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="max-w-5xl mx-auto">
                        {/* Recipes List */}
                        <div className="space-y-4">
                            {searchResults.map(recipe => (
                                <div key={recipe.id}>
                                    <RecipeSearchCard recipe={recipe} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RecipesSearchPage;