import React, { createContext, useContext, useEffect, useState } from 'react';

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        setError('');
        
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        const result = handleLogin(email, password);
        if (!result) {
            setError('Invalid email or password');
        }
        
        setEmail('');
        setPassword('');
    };

    return (
        <div className='flex h-screen w-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800'>
            <div className='border-2 border-emerald-600 p-20 rounded-2xl bg-gray-900/50 backdrop-blur-sm'>
                <h2 className='text-3xl font-bold text-emerald-500 mb-8 text-center'>Employee Management</h2>
                <form onSubmit={submitHandler} className='flex flex-col items-center justify-center'>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='outline-none bg-transparent border-2 border-emerald-600 text-xl rounded-full py-4 px-5 placeholder:text-gray-500 w-80'
                        type="email"
                        placeholder='Enter your email'
                    />
                    <div className='relative w-80 mt-5'>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='outline-none bg-transparent border-2 border-emerald-600 text-xl rounded-full py-4 px-5 placeholder:text-gray-500 w-full'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter password'
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white'
                        >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>
                    {error && <p className='text-red-500 text-sm mt-3'>{error}</p>}
                    <button className='outline-none border-none bg-emerald-600 hover:bg-emerald-700 text-xl rounded-full py-2 px-8 mt-5 w-80 transition-colors'>
                        Log in
                    </button>
                    <div className='mt-6 text-gray-400 text-sm'>
                        <p>Demo Credentials:</p>
                        <p>Admin: admin@example.com / 123</p>
                        <p>Employee: employee1@example.com / 123</p>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default Login