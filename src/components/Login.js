import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export let userInfo = {};

export default function Login() {
  const { currentUser, login } = useAuth();

  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/")
    } else {}
  }, [])

  return (
    <div className='Login'>
      <button onClick={(e) => {
        e.preventDefault();
        login(googleProvider)
      }}>Login with Google</button>
    </div>
  )
}