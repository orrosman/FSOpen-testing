import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Blog from './components/Blog';
import blogService from './services/blogs';
import { logout } from './services/auth';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const { state } = useLocation();
	let navigate = useNavigate();

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	const onLogout = () => {
		const hasLoggedOut = logout();

		if (hasLoggedOut) {
			navigate('/');
		} else {
			alert('Something went wrong, try again later');
		}
	};
	return (
		<div className="container">
			<h2>Blogs</h2>
			<p>
				{state.name} is logged in{' '}
				<Button onClick={onLogout} className="p-1">
					Logout
				</Button>
			</p>
			{blogs.map((blog) => (
				<Blog key={blog._id} blog={blog} />
			))}
		</div>
	);
};

export default App;
