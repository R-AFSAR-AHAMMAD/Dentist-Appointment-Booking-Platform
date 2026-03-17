import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const Login = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const loginData = {
      username: username,
      password: password
    };

    axios.post('http://localhost:5000/api/auth/login', loginData)
      .then((response) => {
        console.log('Login success:', response.data);
        localStorage.setItem('adminToken', response.data.token);
        setLoading(false);
        props.onLogin();
      })
      .catch((error)=> {
        console.log('Login error:', error);
        setError('Invalid username or password');
        setLoading(false);
      });
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-sm">

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          <FontAwesomeIcon icon={faUserShield} className="mr-2" />
          Admin Login
        </h2>

        <form onSubmit={handleLogin}>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
                className="w-full text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full text-sm focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        
        <p className="text-center text-gray-400 text-xs mt-4">
          Username: admin | Password: password
        </p>

      </div>
    </div>
  );
}

export default Login;