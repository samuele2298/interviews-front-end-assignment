'use client'

import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecipeStore } from '@/store/recipeStore'; // Adjust import path based on your project structure
import { RecipeFormType } from '@/types/form';
import Navbar from '@/components/Navbar';
import FormRow from '@/components/FormRow';
import FormLabel from '@/components/FormLabel';
import { useDropzone } from 'react-dropzone';

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
    const onDrop = useCallback((acceptedFiles: Array<File>) => {
        const file = new FileReader;

        file.onload = function () {
            setPreview(file.result);
        }

        file.readAsDataURL(acceptedFiles[0])
    }, [])
    const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    });
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);


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
            if (!acceptedFiles || acceptedFiles.length === 0) validationErrors.image = 'Image is required';


            // If there are validation errors, handle them appropriately
            if (Object.keys(validationErrors).length > 0) {
                // Handle validation errors (e.g., show error messages)
                console.error('Validation errors:', validationErrors);
                return; // Exit early if there are validation errors
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
            <div className=" h-ful w-full mt-8 ml-10 mb-5">
                <h1 className="text-3xl h-ful w-full font-bold mb-4">Add New Recipe</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="h-ful w-full flex-row flex">
                        <div className="w-1/2 h-full mr-10">

                            <div className="mb-4">
                                <label htmlFor="name" className="block font-semibold mb-4">Recipe Name</label>
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

                            <div className="mb-4">
                                <label htmlFor="ingredients" className="block font-semibold mb-4">Ingredients</label>
                                {recipeForm.ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex items-center space-x-2 mb-4">
                                        <label>
                                            Name
                                            <input
                                                type="text"
                                                value={ingredient}
                                                onChange={e => handleIngredientChange(e, index)}
                                                className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none ${errors.ingredients && 'border-red-500'}`}
                                            />
                                        </label>

                                        <button
                                            type="button"
                                            onClick={() => handleRemoveIngredient(index)}
                                            className="bg-orange-500  text-white px-4 py-1 font-bold rounded-full shadow-md hover:scale-105 transform transition duration-300 mt-6 md:mt-0"

                                        >
                                            -
                                        </button>

                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddIngredient}
                                    className="bg-orange-500  text-white px-8 py-3 font-semibold rounded-full shadow-md hover:scale-105 transform transition duration-300 mt-6 md:mt-0"

                                >
                                    Add Ingredient
                                </button>
                                {errors.ingredients && <p className="text-red-500">{errors.ingredients}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="instructions" className="block font-semibold mb-4">Instructions</label>
                                <textarea
                                    id="instructions"
                                    name="instructions"
                                    value={recipeForm.instructions}
                                    onChange={handleChangeName}
                                    className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none ${errors.instructions && 'border-red-500'}`}
                                />
                                {errors.instructions && <p className="text-red-500">{errors.instructions}</p>}
                            </div>


                        </div>




                        <div className="w-1/2 h-full">
                            <div className="flex-row flex">
                                <div className="ml-4">
                                    <label htmlFor="cuisineId" className="block font-semibold mb-4">Cuisine</label>
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


                                <div className="ml-4">
                                    <label htmlFor="dietId" className="block font-semibold mb-4">Diet</label>
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


                                <div className="ml-4">
                                    <label htmlFor="difficultyId" className="block font-semibold mb-4">Difficulty</label>
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

                            </div>
                            <div className="ml-4 mt-5">

                                <FormRow className="mb-5">
                                    <FormLabel htmlFor="image">Image</FormLabel>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {
                                            isDragActive ?
                                                <p>Drop the files here ...</p> :
                                                <p>Drag 'n' drop some files here, or click to select files</p>
                                        }
                                    </div>
                                </FormRow>

                                {preview && (
                                    <p className="mb-5">
                                        <img src={preview as string} alt="Upload preview" />
                                    </p>
                                )}

                            </div>
                            <button
                                type="submit"
                                className="bg-orange-500  text-white px-8 py-3 font-bold rounded-full shadow-md hover:scale-105 transform transition duration-300 mt-6 md:mt-0"

                            >
                                Add Recipe
                            </button>
                        </div>




                    </div>


                </form>
            </div >
        </div >
    );
};

export default AddRecipe;
