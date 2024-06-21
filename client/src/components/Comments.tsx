'use client'

import { CommentType } from '../types/api';
import { FaStar } from 'react-icons/fa';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface CommentsProps {
    comments: CommentType[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'dd MMMM yyyy', { locale: it });
    };

    return (
        <div className="w-full h-full p-8 bg-white rounded-lg shadow-lg ml-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-left ml-3">Comments:</h2>
            <ul className="space-y-4">
                {comments?.map(comment => (
                    <li key={comment.id} className="border p-6 rounded-lg shadow-md space-y-4">
                        <p className="text-gray-800 text-lg">{comment.comment}</p>
                        <div className="flex items-center space-x-2">
                            {Array.from({ length: 5 }, (_, index) => (
                                <FaStar
                                    key={index}
                                    className={`text-2xl ${index < comment.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <p className="text-gray-600 text-sm">{formatDate(comment.date)}</p>
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

