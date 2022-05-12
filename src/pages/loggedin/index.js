import './styles.css';
import success from 'assets/success.png';

const LoggedIn = () => {
  return (
    <div className='loggedin-container'>
      <img src={success} alt='Success icon' />
      <p>xyz</p>
    </div>
  );
};

export default LoggedIn;
