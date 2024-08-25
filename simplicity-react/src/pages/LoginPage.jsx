import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api'; // Import the loginUser function
import "./LoginPage.css";
import { setUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state
        try {
            const data = await loginUser(username, password);
            // Save the token in localStorage or sessionStorage
            localStorage.setItem('token', data.token); // Adjust based on your API response structure

            // Dispatch the setUser action to store user info in Redux
            dispatch(setUser({ ...data.user }));

            // Redirect to the posts page after successful login
            navigate('/posts');
        } catch (err) {
            // Set error message based on the error response
            setError(err.message || 'Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='username-wrapper'>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='password-wrapper'>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
