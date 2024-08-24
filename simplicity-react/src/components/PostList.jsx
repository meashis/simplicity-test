import React, { useEffect, useState } from 'react';
import { getPosts, deletePost } from '../api/api';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const response = await getPosts();
        setPosts(response.data);
    };

    const handleDelete = async (id) => {
        await deletePost(id);
        fetchPosts();
    };

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        {post.title} <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
