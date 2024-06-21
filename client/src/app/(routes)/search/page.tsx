'use client'
import { useState, useEffect } from 'react';
import { useSearchStore } from '@/store/searchStore'; // Adjust import path based on your project structure
import { RecipeFilterType } from '@/types/api';
import Navbar from '@/components/Navbar';
import RecipeSearchCard from '@/components/RecipeCard';
import { useRecipeStore } from '@/store/recipeStore';
import { FaSyncAlt } from 'react-icons/fa';
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
                <div className="w-1/4 p-8 border-r border-gray-300">
                    <div className="flex flex-row mb-4 ml-2">
                        <h2 className="text-2xl font-bold ">Search</h2>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex items-center ml-2 px-4 py-2 text-gray-800 rounded hover:bg-gray-400"
                            style={{ background: 'transparent' }} // Use inline style to set background to transparent
                        >
                            <FaSyncAlt className="mr-2 text-orange-500 text-1xl" />

                        </button>
                    </div>
                    <div className="space-y-4">
                        <div>
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
                            <label className="block font-bold mb-3 ml-2">Cuisine Preference</label>
                            <div className="flex flex-wrap ">
                                {cuisines.map(cuisine => (
                                    <div key={cuisine.id} className="flex items-center space-x-2 mb-1 ">
                                        <input
                                            type="checkbox"
                                            id={cuisine.id}
                                            name="cuisineId"
                                            value={cuisine.id}
                                            checked={filters.cuisineId === cuisine.id}
                                            onChange={handleFilterChange}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor={cuisine.id}
                                            className={`cursor-pointer px-4 py-1 rounded-full border border-gray-300 
                        ${filters.cuisineId === cuisine.id ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'}
                        hover:bg-orange-500 hover:text-white focus:bg-orange-500 focus:text-white`}
                                        >
                                            {cuisine.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Diet Preference */}
                        <div className="mb-6">
                            <label className="block font-bold mb-3 ml-2">Diet Preference</label>
                            <div className="flex flex-wrap">
                                {diets.map(diet => (
                                    <div key={diet.id} className="flex items-center space-x-2 mb-1 ">
                                        <input
                                            type="checkbox"
                                            id={diet.id}
                                            name="dietId"
                                            value={diet.id}
                                            checked={filters.dietId === diet.id}
                                            onChange={handleFilterChange}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor={diet.id}
                                            className={`cursor-pointer px-4 py-1 rounded-full border border-gray-300 
                            ${filters.dietId === diet.id ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'}
                            hover:bg-orange-500 hover:text-white focus:bg-orange-500 focus:text-white`}
                                        >
                                            {diet.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty Level */}
                        <div>
                            <label className="block font-bold mb-3 ml-2">Difficulty Level</label>
                            <div className="flex flex-wrap">
                                {difficulties.map(difficulty => (
                                    <div key={difficulty.id} className="flex items-center space-x-2 mb-1 ">
                                        <input
                                            type="checkbox"
                                            id={difficulty.id}
                                            name="difficultyId"
                                            value={difficulty.id}
                                            checked={filters.difficultyId === difficulty.id}
                                            onChange={handleFilterChange}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor={difficulty.id}
                                            className={`cursor-pointer px-4 py-1 rounded-full border border-gray-300 
                            ${filters.difficultyId === difficulty.id ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'}
                            hover:bg-orange-500 hover:text-white focus:bg-orange-500 focus:text-white`}
                                        >
                                            {difficulty.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/*                  <button
                            type="button"
                            onClick={handleSearch}
                            className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        >
                            Search
                        </button>

                    */}

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