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

    if (username === 'test' && password === 'test123') {
      dispatch(loginSuccess('fake-jwt-token'));
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel (dark) */}
      <div className="w-1/2 bg-neutral-900 text-white p-10 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-semibold">Team Task Manager</h1>
        </div>
          <div>
            <blockquote className="text-xs md:text-sm opacity-70 leading-relaxed">
              Great teams don’t just set goals they organize, prioritize, and execute them with clarity.
              A powerful dashboard turns plans into progress.
            </blockquote>
            <p className="mt-4 text-sm font-medium">Your Daily Workflow Companion</p>
          </div>
      </div>

      {/* Right panel (light) */}
      <div className="w-1/2 bg-white p-10 flex flex-col justify-center">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-2">Sign In</h2>
          <p className="text-sm text-gray-600 mb-6">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-black placeholder:text-gray-500 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black placeholder:text-gray-500 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-black" />
                Remember me
              </label>
              <a href="#" className="text-black hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-900 transition"
            >
              Sign In
            </Button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-200" />
            <span className="px-4 text-xs text-gray-500 uppercase">OR CONTINUE WITH</span>
            <div className="flex-grow h-px bg-gray-200" />
          </div>

          {/* GitHub Login */}
          <button className="w-full border border-gray-300 py-2 rounded-md text-sm flex items-center justify-center hover:bg-gray-100 transition mb-3">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.39c.6.11.82-.26.82-.58 0-.28-.01-1.02-.02-2-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.83.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </button>

          {/* Google Login */}
          <button className="w-full border border-gray-300 py-2 rounded-md text-sm flex items-center justify-center hover:bg-gray-100 transition">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3">
              <path
                d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.2H272v95h147.4c-6.4 34.5-25.1 63.7-53.7 
                  83.1v68.5h86.8c50.9-46.9 81.1-116 81.1-196.4z"
                fill="#4285f4"
              />
              <path
                d="M272 544.3c72.9 0 134-24.2 178.6-65.7l-86.8-68.5c-24.1 16.2-55 25.7-91.8 
                  25.7-70.6 0-130.4-47.7-151.7-111.4H31.6v69.9c44.8 88.7 136.5 150 240.4 
                  150z"
                fill="#34a853"
              />
              <path
                d="M120.3 324.3c-10.4-30.2-10.4-62.7 0-92.9v-69.9H31.6a272.4 272.4 0 000 
                  232.7l88.7-69.9z"
                fill="#fbbc04"
              />
              <path
                d="M272 107.7c39.7 0 75.4 13.7 103.6 40.7l77.6-77.6C405.9 24.2 344.9 
                  0 272 0 168.1 0 76.4 61.3 31.6 150l88.7 69.9C141.6 155.4 201.4 107.7 
                  272 107.7z"
                fill="#ea4335"
              />
            </svg>
            Google
          </button>

          <p className="text-[10px] text-gray-500 mt-6 text-center">
            By clicking continue, you agree to our{' '}
            <a href="#" className="underline">Terms of Service</a> and{' '}
            <a href="#" className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
