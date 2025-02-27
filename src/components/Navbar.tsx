import { Link } from '@tanstack/react-router';

const Navbar = () => {
  const isRegistered = false;

  return (
    <div className='flex gap-2 p-3 border border-gray-400 justify-around items-center'>
      <Link to="/" className='hover:underline'>Logo</Link>

      <div className='flex gap-3.5 items-center'>
        <nav>
          <Link
            to="/"
            activeProps={{ className: 'font-bold' }}
            className='hover:underline'
          >
            Home
          </Link>
        </nav>

        <div className=''>
          {isRegistered ? (
            <button type='button' className='border p-3 rounded-lg cursor-pointer'>
              <Link
                to="/login"
                className='hover:underline'
              >
                Login
              </Link>
            </button>
          ) : (
            <button type='button' className='border p-3 rounded-lg cursor-pointer'>
              <Link
                to="/register"
                className='hover:underline'
              >
                Register
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;