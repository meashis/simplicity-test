import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your Node.js API URL

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
};

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, {
            username,
            password,
        });
        return response.data; // Assuming the response contains the token
    } catch (error) {
        // Handle error appropriately
        throw error.response ? error.response.data : { message: 'Network Error' };
    }
};

export const getPosts = async () => {
    return await axios.get(`${API_URL}/posts`);
};

export const getPostById = async (id) => {
    return await axios.get(`${API_URL}/posts/${id}`);
};

export const createPost = async (post) => {
    return await axios.post(`${API_URL}/posts`, post);
};

export const updatePost = async (id, post) => {
    return await axios.put(`${API_URL}/posts/${id}`, post);
};

export const deletePost = async (id) => {
    return await axios.delete(`${API_URL}/posts/${id}`);
};

export const getPages = async () => {
    return await axios.get(`${API_URL}/pages`);
};

export const getPageById = async (id) => {
    return await axios.get(`${API_URL}/pages/${id}`);
};

export const createPage = async (page) => {
    return await axios.post(`${API_URL}/pages`, page);
};

export const updatePage = async (id, page) => {
    return await axios.put(`${API_URL}/pages/${id}`, page);
};

export const deletePage = async (id) => {
    return await axios.delete(`${API_URL}/pages/${id}`);
};

export const getCommentsByPostId = async (postId) => {
    return await axios.get(`${API_URL}/comments/${postId}`);
};

export const createComment = async (comment) => {
    return await axios.post(`${API_URL}/comments`, comment);
};

export const deleteComment = async (id) => {
    return await axios.delete(`${API_URL}/comments/${id}`);
};
