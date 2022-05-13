// Import css
import './App.css';

// Import components
import NavBar from 'components/Navbar';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import UserProfile from './pages/user';
import Error from 'pages/error';

// Import react router
import { Routes, Route } from 'react-router-dom';

// Import from react
import { useState } from 'react';

function App() {
  const [isUser, setIsUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  return (
    <div className='App'>
      <NavBar setIsUser={setIsUser} isUser={isUser} />
      <Routes>
        <Route
          path='/'
          element={
            <Login
              errorMsg={errorMsg}
              setErrorMsg={setErrorMsg}
              setIsUser={setIsUser}
            />
          }
        />
        <Route path='signup' element={<SignUp setErrorMsg={setErrorMsg} />} />
        {isUser && <Route path='userProfile' element={<UserProfile />} />}
        <Route path='error' element={<Error errorMsg={errorMsg} />} />
      </Routes>
    </div>
  );
}

export default App;
