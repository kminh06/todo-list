import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../css/Login.css'
import Fb from '../media/path14.png'

export default function Login() {
  const { currentUser, login } = useAuth();
  const googleProvider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard")
    } else {}
  }, [])

  return (
    <div className='Login'>
      <h1 id='title'>Log In</h1>
      <button className='loginBtn google' onClick={(e) => {
        e.preventDefault();
        login(googleProvider)
      }}>{<img src='https://img.icons8.com/color/100/000000/google-logo.png'></img>}<span>Login with Google</span></button>
      <button className='loginBtn facebook' onClick={(e) => {
        e.preventDefault();
        login(fbProvider)
      }}>{<img src={Fb}></img>}<span>Login with Facebook</span></button>
    </div>
  )
}