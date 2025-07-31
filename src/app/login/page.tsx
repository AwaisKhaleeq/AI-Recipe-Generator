'use client';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    await supabase.auth.signInWithOtp({ email });
    alert('Magic link sent!');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter email"
        className="border p-2 mb-2"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Send Magic Link
      </button>
    </div>
  );
}
