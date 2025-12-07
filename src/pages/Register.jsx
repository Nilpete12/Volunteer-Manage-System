import React from 'react';

const Register = () => {
  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">📝 Register</h1>
      <p className="text-gray-700 mb-6">Create an account to join campaigns and track your activity.</p>
      <form className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Full name" />
        <input className="w-full p-2 border rounded" placeholder="Email" />
        <input className="w-full p-2 border rounded" placeholder="Password" type="password" />
        <button className="w-full bg-green-600 text-white p-2 rounded">Create Account</button>
      </form>
    </div>
  );
}

export default Register;
