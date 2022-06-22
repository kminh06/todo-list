import React from 'react';
import { db, auth } from '../firebase/config';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Login() {
  const googleProvider = new GoogleAuthProvider();

  function login(provider) {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const userID = user.uid;
        console.log(user);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      })
  }

  return (
    <div className='Login'>
      <button onClick={(e) => {
        e.preventDefault();
        login(googleProvider)
      }}>Login with Google</button>
    </div>
  )
}
