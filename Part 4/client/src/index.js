import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import LoginPage from './components/LoginPage';

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/blogs" element={<App />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById('root')
);
