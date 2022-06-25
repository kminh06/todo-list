import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import '../css/Dashboard.css'
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import Logo from '../media/favicon.png'

export default function Dashboard() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {

    } else {
      navigate("/login")
    }
  }, [])

  async function handleLogout() {
    let result = window.confirm("Are you sure you want to log out?");
    if (result) {
      try {
        await logout();
        navigate("/login")
      } catch (error) {
        console.log("Failed")
      }
    } else {}
  }

  return (
    (currentUser) ? <div className='Dashboard'>
      <div id='header'>
        <span className='left-col'>
          <img src={Logo} id='logo' />
          <h2>Todos</h2>
        </span>
        <img src={currentUser.photoURL} className='avatar' />
        <button className='btn' onClick={(e) => {
          e.preventDefault();
          handleLogout();
        }}>Log Out</button>
      </div>
      <div className='TodoList'>
        <h2 className='title'>{currentUser.displayName}'s Todo List:</h2>
        <TodoList />
      </div>
    </div> : navigate("/login")
  )
}
