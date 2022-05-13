// Import from react router
import { Link, useNavigate } from 'react-router-dom';

// Import from react
import { useState } from 'react';

// Import Components
import Input from 'components/Input';
import Button from 'components/Button';

// cookie
import Cookies from 'js-cookie';

import './styles.css';
const Login = ({ setIsUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });

  const handleChangeLogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const verifyJWTToken = () => {
    // verifying token
    const authToken = Cookies.get('token');

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${authToken}`);
    myHeaders.append('Cookie', `token=${authToken}`);
    fetch('http://139.59.7.189:49154/v1/verify/jwt', {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    })
      .then((res) => {
        if (res.status === 200) {
          setUser(Cookies.get('userDetails'));
          setIsUser(true);
          navigate('/userProfile');
        }
        return user;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // log in, creating token on success
    fetch('http://139.59.7.189:49154/v1/signin', {
      method: 'POST',
      headers,
      body: JSON.stringify(userLogin),
      redirect: 'follow',
    })
      .then((res) => res.json())
      .then((result) => {
        let token = result.token;
        Cookies.set('token', `${token}`);
        Cookies.set('userDetails', `${JSON.stringify(result.user)}`);
        verifyJWTToken();
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
        New user? <Link to='/signup'>signup</Link>
      </p>
    </div>
  );
};
export default Login;
