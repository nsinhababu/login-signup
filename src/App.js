import './App.css';
import NavBar from 'components/Navbar';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import UserProfile from './pages/user';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
function App() {
  const [isUser, setIsUser] = useState(false);

  return (
    <div className='App'>
      <NavBar setIsUser={setIsUser} isUser={isUser} />
      <Routes>
        <Route path='/' element={<Login setIsUser={setIsUser} />} />
        <Route path='signup' element={<SignUp />} />
        {isUser && <Route path='userProfile' element={<UserProfile />} />}
      </Routes>
    </div>
  );
}

export default App;
