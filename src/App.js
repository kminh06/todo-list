import React from 'react';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}
