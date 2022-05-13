import './styles.css';
import userImg from 'assets/userImg.png';

// Cookies
import Cookies from 'js-cookie';

const UserProfile = () => {
  const user = JSON.parse(Cookies.get('userDetails'));
  return (
    <div className='user-wrapper'>
      <div className='user-container'>
        <div>
          <img src={userImg} alt='Success icon' />
        </div>
        <div className='user-data-container'>
          <p className='name'>{user.name}</p>
          <p className='email'>{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
