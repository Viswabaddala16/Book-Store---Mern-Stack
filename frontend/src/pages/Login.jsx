import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {enqueueSnackbar}  = useSnackbar();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://book-store-backend-jit8.onrender.com/login', { email, password });
      console.log(response.data);
      console.log(response);
      // Assuming the response includes a token or a success message
      setIsLoggedIn(true); // Update login state
      enqueueSnackbar("Logged Successfully",{variant: "success"});
      navigate('/'); // Redirect to home after successful login
    } catch (error) {
      enqueueSnackbar("Error",{variant: "error"});
      console.error('Login failed', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="p-4 bg-center bg-cover h-screen"
    style={{ backgroundImage: "url('../../public/Image/loginImage.jpg')" }}
    >
      <div className='flex justify-end relative gap-4 mr-6'>
        <div className='mr-4  rounded bg-sky-300 hover:bg-blue-800 px-4 py-1'><Link to='/'>Home</Link></div>
        <div className='mr-10  rounded bg-sky-300 hover:bg-blue-800 px-4 py-1'><Link to='/signup'>Signup</Link></div>
      </div>
      <h2 className="text-2xl mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className='text-center '>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded px-2 py-1 w-2/3 outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded px-2 py-1 w-2/3 outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-sky-300 hover:bg-sky-800 px-4 py-1 rounded-lg">
          Login
        </button>
        <Link to='/forgot-password' className='text-blue-800  hover:underline ml-4 '>Forgot Password?</Link>
      </form>
    </div>
  );
}

export default Login;
