'use client'

import React, { useState } from 'react';
import { useRecipeStore } from '@/store/recipeStore';
import { CommentFormType } from '@/types/form';
import { FaStar } from 'react-icons/fa';

interface AddCommentsProps {
    recipeId: string;
}

const AddComments: React.FC<AddCommentsProps> = ({ recipeId }) => {
    const { addComment } = useRecipeStore(); // Destructure getRecipe from useRecipeStore

    const [newComment, setNewComment] = useState<CommentFormType>({
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

    const [rating, setRating] = useState<number>(newComment.rating);
    const [showNotification, setShowNotification] = useState(false);

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
        handleChange({ target: { name: 'rating', value: String(newRating) } } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(newComment); // Process newComment here
        addComment(recipeId, newComment);

    };

    return (
        <div className="w-full h-full p-8 bg-white rounded-lg shadow-lg">
            <div className="mt-4">
                <form onSubmit={handleSubmit} className="flex flex-row space-y-4 w-full">
                    <div className="w-full">
                        <label className="block text-gray-800 mb-2">Comment:</label>
                        <input
                            type="text"
                            name="comment"
                            value={newComment.comment}
                            onChange={handleChange}
                            className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="w-full md:ml-20">
                        <label className="block text-gray-800 mb-2">Rating:</label>
                        <div className="flex justify-start space-x-1"> {/* Adjusted to justify-start */}
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={`cursor-pointer text-2xl ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                    onClick={() => handleRatingChange(star)}
                                />
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow-md transition duration-300 w-1/5 md:w-1/4 mx-auto block"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddComments;

