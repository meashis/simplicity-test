import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="welcome-container">
      <h1>Welcome to Simplicity Sample CMS</h1>
      <p>Your lightweight and easy-to-use content management system.</p>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
}

export default Welcome;
