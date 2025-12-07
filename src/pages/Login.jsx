import React from 'react';

const Login = () => {
  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">🔐 Login</h1>
      <p className="text-gray-700 mb-6">Sign in to manage your volunteer profile and applications.</p>
      <form className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Email" />
        <input className="w-full p-2 border rounded" placeholder="Password" type="password" />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
