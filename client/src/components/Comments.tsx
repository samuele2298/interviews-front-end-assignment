'use client'
import { CommentType } from '../types/api';

interface CommentsProps {
    comments: CommentType[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {

    return (
        <div className="w-full h-full  p-6 bg-white ">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Comments</h2>
            <ul className="space-y-4">
                {comments?.map(comment => (
                    <li key={comment.id} className="border p-4 rounded-lg shadow-md">
                        <p className="text-gray-800">{comment.comment}</p>
                        <p className="text-gray-600">Rating: {comment.rating}</p>
                        <p className="text-gray-600">Date: {comment.date}</p>
                    </li>
                ))}
                {comments?.length === 0 && (
                    <li className="text-gray-600 text-center">No comments yet.</li>
                )}
            </ul>

        </div>
    );
};

export default Comments;

