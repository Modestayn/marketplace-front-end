import { Link } from 'react-router-dom';

const Navbar = () => {
  const isRegistered = false;
  return (
    <div className='flex gap-2 p-3 border border-gray-400 justify-around items-center'>
      <Link to='/'>Logo</Link>
      <div className='flex gap-3.5 items-center'>
        <nav>
          <Link to='/'>Home</Link>
        </nav>
        <div className=''>
          {isRegistered ? (
            <button type='button' className='border p-3 rounded-lg cursor-pointer'>
              <Link to='/login'>Login</Link>
            </button>
          ) : (
            <button type='button' className='border p-3 rounded-lg cursor-pointer'>
              <Link to='/register'>Register</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
