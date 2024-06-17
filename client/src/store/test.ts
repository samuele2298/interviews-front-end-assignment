// stores/recipeStore.ts

import create from 'zustand';

interface Recipe {
    id: string;
    name: string;
    ingredients: string[];
    instructions: string;
    cuisineId: string;
    dietId: string;
    difficultyId: string;
    image: string;
}

interface RecipeStoreState {
    recipes: Recipe[];
    currentRecipeIndex: number;
    setCurrentRecipeIndex: (index: number) => void;
}

// Sample fake recipe data
const fakeRecipes: Recipe[] = [
    {
        id: '1',
        name: 'Spaghetti Carbonara',
        ingredients: ['Spaghetti', 'Eggs', 'Guanciale', 'Parmesan cheese', 'Black pepper'],
        instructions: 'Cook spaghetti, fry guanciale, mix eggs and cheese, combine everything with pasta.',
        cuisineId: 'italian',
        dietId: 'normal',
        difficultyId: 'medium',
        image: 'spaghetti_carbonara.jpg',
    },
    {
        id: '2',
        name: 'Chicken Tikka Masala',
        ingredients: ['Chicken', 'Tomato sauce', 'Cream', 'Spices', 'Rice'],
        instructions: 'Marinate chicken, grill it, make tomato sauce, add cream and spices, serve with rice.',
        cuisineId: 'indian',
        dietId: 'normal',
        difficultyId: 'medium',
        image: 'chicken_tikka_masala.jpg',
    },
    // Add more fake recipes as needed
];

const useRecipeStore = create<RecipeStoreState>((set) => ({
    recipes: fakeRecipes, // Replace with your actual data
    currentRecipeIndex: 0,
    setCurrentRecipeIndex: (index: number) => set({ currentRecipeIndex: index }),
}));

export default useRecipeStore;
