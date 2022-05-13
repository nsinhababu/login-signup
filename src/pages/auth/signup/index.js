import Input from '../../../components/Input';
import Button from '../../../components/Button';

// Import hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// Import css
import './styles.css';

const SignUp = ({ setErrorMsg }) => {
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

  const emailVerification =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      userInfo.email
    );

  const checkValidation = (name, value) => {
    const properName = value >= 3 && value <= 18;
    const properPassword = value >= 6 && value <= 18;

    if (name === 'email')
      emailVerification === false
        ? setErrorObj({ ...errorObj, email: '*Not a valid email id' })
        : setErrorObj({ ...errorObj, email: '' });

    if (name === 'password')
      properPassword === false
        ? setErrorObj({
            ...errorObj,
            password: '*password should be between 6 to 18 characters',
          })
        : setErrorObj({
            ...errorObj,
            password: '',
          });

    if (name === 'name')
      properName === false
        ? setErrorObj({
            ...errorObj,
            name: '*name should be between 3 to 18 characters',
          })
        : setErrorObj({
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
    checkValidation(name, value.length);
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
        } else {
          throw new Error(`${res.status} ${res.statusText}`);
        }
      })
      .catch((e) => {
        setErrorMsg(e.toString());
        toast.error(e?.statusText || 'Something went wrong, please try again.');
        navigate('/error');
      });
  };

  return (
    <div className='signup-container'>
      <form
        className='signup-form'
        method='POST'
        onSubmit={handleSubmit}
        action=''
      >
        <div>
          <Input
            type='text'
            name='name'
            value={userInfo.name}
            onChange={handleChange}
            required
          />
          <span>{errorObj.name}</span>
        </div>

        <div>
          <Input
            type='tel'
            name='phone_Number'
            value={userInfo.phone_Number}
            onChange={handleChange}
            min='10'
            max='10'
            required
          />
          <span>{errorObj.phone_Number}</span>
        </div>

        <div>
          <Input
            type='mail'
            name='email'
            value={userInfo.email}
            onChange={handleChange}
            required
          />
          <span>{errorObj.email}</span>
        </div>

        <div>
          <Input
            type='password'
            name='password'
            value={userInfo.password}
            onChange={handleChange}
            required
          />
          <span>{errorObj.password}</span>
        </div>

        <Button onClick={() => handleSubmit} type='submit'>
          Sign up
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

export default SignUp;
