import React from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}
