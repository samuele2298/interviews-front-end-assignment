'use client'
import React, { useState } from 'react';
import { CommentType } from '../types/api';
import { useRecipeStore } from '@/store/recipeStore';
import { CommentFormType } from '@/types/form';

interface CommentsProps {
    recipeId: string;
    comments: CommentType[];
}

const Comments: React.FC<CommentsProps> = ({ recipeId, comments }) => {
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
        <div>
            <h2>Comments</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>Rating: {comment.rating}</p>
                        <p>Date: {comment.date}</p>
                    </li>
                ))}
            </ul>
            <h3>Add a Comment</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Comment:
                    <input
                        type="text"
                        name="comment"
                        value={newComment.comment}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Rating:
                    <input
                        type="number"
                        name="rating"
                        value={newComment.rating.toString()}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Comments;

