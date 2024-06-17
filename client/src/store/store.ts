import create from 'zustand';

interface RecipeState {
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
    nextRecipe: () => void;
    prevRecipe: () => void;
}

export const useRecipeStore = create<RecipeState>((set) => ({
    currentIndex: -1,
    setCurrentIndex: (index) => set({ currentIndex: index }),
    nextRecipe: () => set((state) => ({ currentIndex: (state.currentIndex + 1) % recipes.length })),
    prevRecipe: () => set((state) => ({ currentIndex: state.currentIndex === 0 ? recipes.length - 1 : state.currentIndex - 1 })),
}));

const recipes = [
    {
        title: 'Recipe 1',
        description: 'This is the first recipe description.',
        image: '/path/to/image1.jpg'
    },
    {
        title: 'Recipe 2',
        description: 'This is the second recipe description.',
        image: '/path/to/image2.jpg'
    },
    // Add more recipes as needed
];
