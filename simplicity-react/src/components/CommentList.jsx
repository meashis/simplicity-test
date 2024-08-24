import React, { useEffect, useState } from 'react';
import { getCommentsByPostId, deleteComment } from '../api/api';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const fetchComments = async () => {
        const response = await getCommentsByPostId(postId);
        setComments(response.data);
    };

    const handleDelete = async (id) => {
        await deleteComment(id);
        fetchComments();
    };

    return (
        <div>
            <h2>Comments</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        {comment.comment} <button onClick={() => handleDelete(comment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
