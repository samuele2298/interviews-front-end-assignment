'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecipeStore } from '@/store/recipeStore'; // Adjust import path based on your project structure
import { RecipeFormType } from '@/types/form';
import Navbar from '@/components/Navbar';

const AddRecipe = () => {
    const router = useRouter();
    const { addRecipe, difficulties, cuisines, diets,
        getCuisines, getDiets, getDifficulties } = useRecipeStore();

    useEffect(() => {
        getDiets();
        getCuisines();
        getDifficulties();
    }, [getDiets, getCuisines, getDifficulties]);


    const [recipeForm, setRecipeForm] = useState<RecipeFormType>({
        name: '',
        ingredients: [],
        instructions: '',
        cuisineId: '',
        dietId: '',
        difficultyId: '',
        image: 'fgdgdgfgd',
    });
    const [errors, setErrors] = useState({
        name: '',
        ingredients: '',
        instructions: '',
        cuisineId: '',
        dietId: '',
        difficultyId: '',
        image: '',
    });

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRecipeForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangeTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRecipeForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newIngredients = [...recipeForm.ingredients];
        newIngredients[index] = e.target.value;
        setRecipeForm(prev => ({
            ...prev,
            ingredients: newIngredients,
        }));
    };

    //INGRADIENTS
    const handleAddIngredient = () => {
        setRecipeForm(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, ''],
        }));
    };

    const handleRemoveIngredient = (index: number) => {
        const newIngredients = [...recipeForm.ingredients];
        newIngredients.splice(index, 1);
        setRecipeForm(prev => ({
            ...prev,
            ingredients: newIngredients,
        }));
    };


    //IMAGE

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        //handleFileUpload(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        //handleFileUpload(file);
    };

    //SUBMIT
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(recipeForm);

        try {
            // Basic form validation
            const validationErrors: any = {};
            if (!recipeForm.name) validationErrors.name = 'Name is required';
            if (recipeForm.ingredients.length === 0) validationErrors.ingredients = 'At least one ingredient is required';
            if (!recipeForm.instructions) validationErrors.instructions = 'Instructions are required';
            if (!recipeForm.cuisineId) validationErrors.cuisineId = 'Cuisine is required';
            if (!recipeForm.dietId) validationErrors.dietId = 'Diet is required';
            if (!recipeForm.difficultyId) validationErrors.difficultyId = 'Difficulty level is required';
            if (!recipeForm.image) validationErrors.image = 'Image is required';

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            addRecipe(recipeForm);

            // Redirect to recipes page or any other route after successful submission
            router.push('/recipe');
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-3xl mx-auto mt-8">
                <h1 className="text-3xl font-bold mb-4">Add New Recipe</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block font-semibold">Recipe Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={recipeForm.name}
                            onChange={handleChangeName}
                            className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none ${errors.name && 'border-red-500'}`}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="ingredients" className="block font-semibold">Ingredients</label>
                        {recipeForm.ingredients.map((ingredient, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <label>
                                    Name
                                    <input
                                        type="text"
                                        value={ingredient}
                                        onChange={e => handleIngredientChange(e, index)}
                                        className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none ${errors.ingredients && 'border-red-500'}`}
                                    />
                                </label>
                                <button type="button" onClick={() => handleRemoveIngredient(index)} className="px-2 py-1 text-sm bg-red-500 text-white rounded">-</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddIngredient} className="mt-2 px-4 py-2 text-sm bg-green-500 text-white rounded">Add Ingredient</button>
                        {errors.ingredients && <p className="text-red-500">{errors.ingredients}</p>}
                    </div>

                    <div>
                        <label htmlFor="instructions" className="block font-semibold">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            value={recipeForm.instructions}
                            onChange={handleChangeName}
                            className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none ${errors.instructions && 'border-red-500'}`}
                        />
                        {errors.instructions && <p className="text-red-500">{errors.instructions}</p>}
                    </div>

                    <div>
                        <label htmlFor="cuisineId" className="block font-semibold">Cuisine</label>
                        <select
                            id="cuisineId"
                            name="cuisineId"
                            value={recipeForm.cuisineId}
                            onChange={handleChangeTag}
                            className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none ${errors.cuisineId && 'border-red-500'}`}
                        >
                            <option value="">Select Cuisine</option>
                            {cuisines.map(cuisine => (
                                <option key={cuisine.id} value={cuisine.id}>{cuisine.name}</option>
                            ))}
                        </select>
                        {errors.cuisineId && <p className="text-red-500">{errors.cuisineId}</p>}
                    </div>


                    <div>
                        <label htmlFor="dietId" className="block font-semibold">Diet</label>
                        <select
                            id="dietId"
                            name="dietId"
                            value={recipeForm.dietId}
                            onChange={handleChangeTag}
                            className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none ${errors.dietId && 'border-red-500'}`}
                        >
                            <option value="">Select Diet</option>
                            {diets.map(diet => (
                                <option key={diet.id} value={diet.id}>{diet.name}</option>
                            ))}
                        </select>
                        {errors.cuisineId && <p className="text-red-500">{errors.dietId}</p>}
                    </div>


                    <div>
                        <label htmlFor="difficultyId" className="block font-semibold">Difficulty</label>
                        <select
                            id="difficultyId"
                            name="difficultyId"
                            value={recipeForm.difficultyId}
                            onChange={handleChangeTag}
                            className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none ${errors.difficultyId && 'border-red-500'}`}
                        >
                            <option value="">Select Difficulty</option>
                            {difficulties.map(difficulty => (
                                <option key={difficulty.id} value={difficulty.id}>{difficulty.name}</option>
                            ))}
                        </select>
                        {errors.cuisineId && <p className="text-red-500">{errors.difficultyId}</p>}
                    </div>



                    <div
                        className={`border-dashed border-2 border-gray-300 rounded-lg p-8 text-center ${errors.image && 'border-red-500'}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                    >
                        <label htmlFor="image" className="block font-semibold">Drag & Drop or Click to Upload Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleFileInputChange}
                            className="hidden"
                        />
                        <p className="mt-2">Supported file types: JPEG, PNG, GIF</p>
                    </div>

                    <button type="submit" className="w-full mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Add Recipe</button>
                </form>
            </div>
        </div>
    );
};

export default AddRecipe;
