import './App.css'
import {Route, Routes, Navigate  } from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login'
import SignUp from './pages/signup/signUp';
import { useContext } from 'react';
import AuthContext from './auth/context';

function App() {

	const { authState, isAuthenticated } = useContext(AuthContext);

	return (
	  <div className='p-4 h-screen flex items-center justify-center'>
		<Routes>
		  <Route 
			path="/" 
			element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} 
		  />
		  <Route 
			path="/login" 
			element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
		  />
		  <Route 
			path="/signup" 
			element={isAuthenticated ? <Navigate to="/" replace /> : <SignUp />} 
		  />
		</Routes>
	  </div>
	);
  }

export default App
