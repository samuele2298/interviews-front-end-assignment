'use client'

import React, { useState } from 'react';
import { CommentFormType } from '@/src/types/form';
import { FaStar } from 'react-icons/fa';
import { useFormActions } from '../hooks/useFormActions';

interface AddCommentsProps {
    recipeId: string;
}

const AddComment: React.FC<AddCommentsProps> = ({ recipeId }) => {
    const { submitComment } = useFormActions();

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


    //RATING
    const [rating, setRating] = useState<number>(newComment.rating);

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
        setNewComment(prevComment => ({
            ...prevComment,
            rating: newRating,
        }));
    };

    //SUBMIT
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        submitComment(recipeId, newComment);

        // Refresh the page after adding the comment
        window.location.reload();
    };

    return (
        <div className="w-full h-full p-8 bg-white rounded-lg shadow-lg mr-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-left ml-3">Leave a comment:</h2>

            <div className="mt-4">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-start w-full">

                    <div className="w-full md:w-2/3">
                        <label className="block text-gray-800 mb-2">Comment:</label>
                        <input
                            type="text"
                            name="comment"
                            value={newComment.comment}
                            onChange={handleChange}
                            className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="w-full md:w-1/3">
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-white text-orange-500 px-8 py-2 font-bold rounded-full shadow-md hover:scale-105 transform transition duration-300 mt-6 md:mt-0"

                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>

    );
};

export default AddComment;

