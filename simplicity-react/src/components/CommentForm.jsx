import React, { useState } from 'react';
import { createComment } from '../api/api';

const CommentForm = ({ postId, onSuccess }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createComment({ postId, comment });
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Comment:</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </div>
            <button type="submit">Add Comment</button>
        </form>
    );
};

export default CommentForm;
