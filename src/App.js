import './App.css';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import LoggedIn from './pages/auth/loggedin';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='pages/signup' element={<SignUp />} />
        <Route path='pages/auth/loggedin' element={<LoggedIn />} />
      </Routes>
    </div>
  );
}

export default App;
