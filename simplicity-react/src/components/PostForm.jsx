import React, { useState } from 'react';
import { createPost, updatePost } from '../api/api';

const PostForm = ({ postId, existingPost, onSuccess }) => {
    const [title, setTitle] = useState(existingPost?.title || '');
    const [content, setContent] = useState(existingPost?.content || '');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const post = { title, content };
        if (postId) {
            await updatePost(postId, post);
        } else {
            await createPost(post);
        }

        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            <button type="submit">{postId ? 'Update' : 'Create'}</button>
        </form>
    );
};

export default PostForm;
