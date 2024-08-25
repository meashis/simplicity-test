import { useLocation } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Footer = () => {
    const location = useLocation();
    const hideLogoutButton = location.pathname === '/login' || location.pathname === '/';

    return (
        <footer style={{ position: 'absolute', bottom: '20px' }}>
            {!hideLogoutButton && <LogoutButton />}
        </footer>
    );
};

export default Footer;
