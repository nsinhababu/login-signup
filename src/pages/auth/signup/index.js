import Input from '../../../components/Input';
import Button from '../../../components/Button';

// Import hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// Import utils
import { fetchData } from '../../../utils';

// Import css
import './styles.css';

const SignUp = () => {
  let navigate = useNavigate();

  // Object containing user data
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone_Number: '',
    password: '',
  });
  const [errorObj, setErrorObj] = useState({
    name: '',
    email: '',
    phone_Number: '',
    password: '',
  });
  const { name, email, phone_Number, password } = userInfo;

  const emailVerification =
    !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  const checkValidation = (e) => {
    if (e.target.name === 'email' && emailVerification)
      setErrorObj({ ...errorObj, email: 'Not a valid email id' });

    if (e.target.name === 'email' && !emailVerification)
      setErrorObj({ ...errorObj, email: '' });

    if (
      e.target.name === 'password' &&
      (password.length < 6 || password.length > 18)
    )
      setErrorObj({
        ...errorObj,
        password: 'password should be between 6 to 18 characters',
      });

    if (
      e.target.name === 'password' &&
      (password.length >= 6 || password.length <= 18)
    )
      setErrorObj({
        ...errorObj,
        password: '',
      });

    if (e.target.name === 'name' && (name.length < 3 || name.length > 18))
      setErrorObj({
        ...errorObj,
        name: 'name should be between 3 to 18 characters',
      });

    if (e.target.name === 'name' && (name.length >= 3 || name.length <= 18))
      setErrorObj({
        ...errorObj,
        name: '',
      });
  };

  // Handle change function for input
  // takes value from input and creates an object
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({ ...userInfo, [name]: value });
    // checkValidation(e);
  };

  // Handle Submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // Fetching API
    fetch(`http://139.59.7.189:49154/v1/signup`, {
      method: 'POST',
      headers,
      body: JSON.stringify(userInfo),
      redirect: 'follow',
    })
      .then((res) => {
        res.text();
        if (res.status === 200) {
          toast.success('User Sign up successful!');
          navigate('/');
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error(e?.statusText || 'Something went wrong, please try again.');
      });
  };

  const passwordRegex =
    '/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/';
  const emailRegex =
    '/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/';

  return (
    <>
      <form
        className='signup-form'
        method='POST'
        onSubmit={handleSubmit}
        action=''
      >
        <Input
          type='text'
          name='name'
          value={userInfo.name}
          onChange={handleChange}
          required
        />

        <Input
          type='tel'
          name='phone_Number'
          value={userInfo.phone_Number}
          onChange={handleChange}
          min='10'
          max='10'
          required
        />
        <Input
          type='mail'
          name='email'
          value={userInfo.email}
          onChange={handleChange}
          required
          pattern={emailRegex}
        />

        <Input
          type='password'
          name='password'
          value={userInfo.password}
          onChange={handleChange}
          required
          pattern={passwordRegex}
        />
        <Button onClick={() => handleSubmit} type='submit'>
          Sign up
        </Button>
      </form>
      <Toaster />
    </>
  );
};

export default SignUp;
