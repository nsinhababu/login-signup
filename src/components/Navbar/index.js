// React route
import { NavLink, useNavigate } from 'react-router-dom';

import Cookie from 'js-cookie';

// Import css
import './styles.css';
const NavBar = ({ isUser, setIsUser }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate('/');
    setIsUser(false);
    Cookie.remove('token');
    Cookie.remove('userDetails');
  };

  return (
    <nav>
      {!isUser && <NavLink to='/'>Login</NavLink>}
      {!isUser && <NavLink to='/signup'>Sign up</NavLink>}
      {isUser && (
        <button type='button' onClick={logoutHandler}>
          Log out
        </button>
      )}
    </nav>
  );
};

export default NavBar;
