import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import '../css/Dashboard.css'
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const [user, setUser] = useState("")
  const { currentUser, logout } = useAuth()
  // const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {

    } else {
      navigate("/login")
    }
  }, [])

  async function handleLogout() {
    try {
      await logout();
      navigate("/login")
    } catch (error) {
      console.log("Failed")
    }
  }

  console.log(currentUser)

  return (
    (currentUser) ? <div className='Dashboard'>
      <div className='header'>
        <h1>Welcome {currentUser.displayName}</h1>
        <img src={currentUser.photoURL}></img>
        <button onClick={(e) => {
          e.preventDefault();
          handleLogout();
        }}>Log Out</button>
      </div>
      <div className='TodoList'>
        <TodoList />
      </div>
    </div> : navigate("/login")
  )
}
