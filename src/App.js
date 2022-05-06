import './App.css';
import Login from './pages/auth/login';
import SignUp from './pages/auth/signup';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='pages/signup' element={<SignUp />} />
      </Routes>

      {/* <Login /> */}
      {/* <SignUp /> */}
    </div>
  );
}

export default App;
