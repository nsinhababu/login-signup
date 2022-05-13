// Import styles
import './styles.css';

const Error = ({ errorMsg }) => {
  return (
    <div className='error-container'>
      <p>{errorMsg}</p>
    </div>
  );
};
export default Error;
