import React from 'react';
import { useLocation } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Footer = () => {
    const location = useLocation();
    const hideLogoutButton = location.pathname === '/login' || location.pathname === '/';

    return (
        <footer style={{ textAlign: 'center', marginTop: '20px' }}>
            {!hideLogoutButton && <LogoutButton />}
        </footer>
    );
};

export default Footer;
