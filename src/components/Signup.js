import React, { useState } from 'react';
import { db, auth } from '../firebase/config';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function register() {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch(error) {
      console.log(error.message)
      alert(error.message.slice(10))
    }
  }

  return (
    <div className='Signup'>
      <h1>Sign Up</h1>
      <div className='input-group'>
        <input type='email' className='auth-input' placeholder='Email' onChange={(e) => {
          setEmail(e.target.value)
        }} />
        <input type='password' className='auth-input' placeholder='Password' onChange={(e) => {
          setPassword(e.target.value)
        }} />
      </div>
      <button onClick={(e) => {
        e.preventDefault();
        register();
      }} >Create User</button>
    </div>
  )
}
