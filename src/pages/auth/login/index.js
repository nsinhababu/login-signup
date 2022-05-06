// Import Components
import Input from '../../../components/Input';
import Button from '../../../components/Button';

// Import from react
import { Link } from 'react-router-dom';
import { useState } from 'react';

import './styles.css';
const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });

  const handleChangeLogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch('http://139.59.7.189:49154/v1/signin', {
      method: 'POST',
      headers,
      body: JSON.stringify(userLogin),
      redirect: 'follow',
    })
      .then((res) => res.json())
      .then((result) => {
        let token = result.token;
        document.cookie = `token=${token}`;
        document.cookie = `userDetails=${JSON.stringify(result.user)}`;

        console.log(JSON.parse(document.cookie));
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className='login-box'>
      <form onSubmit={handleLogIn} className='login-form' action=''>
        <Input
          type='email'
          name='email'
          value={userLogin.email}
          onChange={handleChangeLogin}
        />
        <Input
          type='password'
          name='password'
          value={userLogin.password}
          onChange={handleChangeLogin}
        />

        <Button type='submit'>Log in</Button>
      </form>
      <p>
        New user? <Link to='pages/signup'>signup</Link>
      </p>
    </div>
  );
};
export default Login;
