import React from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

export default function User(props) {
  const user = createUserWithEmailAndPassword(auth, props.email, props.password);
  return user
}
export const userID = User.user.uid;