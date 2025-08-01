import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { loginSuccess } from '../features/auth/authSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'test' && password === 'shiv1234') {
      dispatch(loginSuccess('fake-jwt-token'));
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-tr from-purple-700 to-purple-500 text-white p-10 relative">
        <div className="text-center z-10">
          <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
          <p className="text-lg">
            You can sign in to access with your existing account.
          </p>
        </div>
        <div className="absolute inset-0 z-0 opacity-30">
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-100 border border-gray-300"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 border border-gray-300"
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-purple-600" />
                Remember me
              </label>
              <a href="#" className="text-purple-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:opacity-90"
            >
              Sign In
            </Button>
          </form>

          <p className="text-sm text-center text-gray-600">
            New here?{' '}
            <a href="#" className="text-purple-600 hover:underline">
              Create an Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
