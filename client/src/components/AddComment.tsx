'use client'
import React, { useState } from 'react';
import { CommentType } from '../types/api';
import { useRecipeStore } from '@/store/recipeStore';
import { CommentFormType } from '@/types/form';

interface AddCommentsProps {
    recipeId: string;
}

const AddComments: React.FC<AddCommentsProps> = ({ recipeId }) => {
    const { addComment } = useRecipeStore(); // Destructure getRecipe from useRecipeStore
    const [newComment, setNewComment] = useState<CommentFormType>({
        recipeId: '1', // Example value, replace with actual recipeId from your application state or props
        comment: '',
        rating: 0, // Example value, adjust as needed
        date: new Date().toISOString(), // Example value, current date/time
    });


    // Example function to update comment state
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewComment(prevComment => ({
            ...prevComment,
            [name]: value,
        }));
    };

    // Example function to handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(newComment); // Process newComment here
        addComment(recipeId, newComment);

    };

    return (
        <div className="w-full h-full p-6 bg-white ">

            <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Add a Comment</h3>
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                    <label className="text-gray-800">
                        Comment:
                        <input
                            type="text"
                            name="comment"
                            value={newComment.comment}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
                        />
                    </label>
                    <label className="text-gray-800">
                        Rating:
                        <input
                            type="number"
                            name="rating"
                            value={newComment.rating.toString()}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow-md transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddComments;

