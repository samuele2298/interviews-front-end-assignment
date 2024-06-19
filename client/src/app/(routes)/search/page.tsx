'use client'
import { useState, useEffect } from 'react';
import { useRecipeStore } from '@/store/recipeStore'; // Adjust import path based on your project structure
import { RecipeFilterType } from '@/types/api';
import Navbar from '@/components/Navbar';
import RecipeSearchCard from '@/components/RecipeSearchCard';

const RecipesSearchPage = () => {
    const { recipes, getRecipes, difficulties, diets, cuisines, getCuisines, getDiets, getDifficulties } = useRecipeStore();
    const [filters, setFilters] = useState<RecipeFilterType>({
        _page: 1,
        _limit: 10,
        q: '',
        cuisineId: '',
        dietId: '',
        difficultyId: '',
        _expand: [],
    });

    useEffect(() => {
        // Initial fetches for filters
        getCuisines();
        getDiets();
        getDifficulties();
    }, [getCuisines, getDiets, getDifficulties]);


    useEffect(() => {
        // Fetch recipes when filters change
        getRecipes(filters);
    }, [filters, getRecipes]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSearch = () => {
        console.log('Q FACTOR ' + filters.q);
        getRecipes(filters);

        console.log('length ' + recipes[0].name);

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
                            <label className="block font-semibold">Cuisine</label>
                            {cuisines.map(cuisine => (
                                <div key={cuisine.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={cuisine.id}
                                        name="cuisineId"
                                        value={cuisine.id}
                                        checked={filters.cuisineId === cuisine.id}
                                        onChange={handleFilterChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor={cuisine.id}>{cuisine.name}</label>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label className="block font-semibold">Diet Preference</label>
                            {diets.map(diet => (
                                <div key={diet.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={diet.id}
                                        name="dietId"
                                        value={diet.id}
                                        checked={filters.dietId === diet.id}
                                        onChange={handleFilterChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor={diet.id}>{diet.name}</label>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label className="block font-semibold">Difficulty Level</label>
                            {difficulties.map(difficulty => (
                                <div key={difficulty.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={difficulty.id}
                                        name="difficultyId"
                                        value={difficulty.id}
                                        checked={filters.difficultyId === difficulty.id}
                                        onChange={handleFilterChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor={difficulty.id}>{difficulty.name}</label>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={handleSearch}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Search
                        </button>
                    </div>
                </div>
                {/* Right Section: Vertically Stacked Recipes List */}
                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="max-w-5xl mx-auto">
                        {/* Recipes List */}
                        <div className="space-y-4">
                            {recipes.map(recipe => (
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