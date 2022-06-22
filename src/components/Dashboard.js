import React, { useState } from 'react';
import TodoList from './TodoList';
import '../css/Dashboard.css'

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState("Admin Testing") 

  return (
    <div className='Dashboard'>
      <div className='header'>
        <h1>Welcome {currentUser}</h1>
      </div>
      <TodoList />
      <a href='/signup'>Sign Up</a>
      <a href='/login'>Login</a>
    </div>
  )
}
