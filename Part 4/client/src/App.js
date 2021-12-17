import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Blog from './components/Blog';
import blogService from './services/blogs';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const { state } = useLocation();

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	return (
		<div className="container">
			<h2>Blogs</h2>
			<p>{state.name} is logged in</p>
			{blogs.map((blog) => (
				<Blog key={blog._id} blog={blog} />
			))}
		</div>
	);
};

export default App;
