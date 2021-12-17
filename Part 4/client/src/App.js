import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Blog from './components/Blog';
import blogService from './services/blogs';
import { logout } from './services/auth';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const { state } = useLocation();
	let navigate = useNavigate();

	const getAllBlogs = () => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	};
	useEffect(getAllBlogs, []);

	const onLogout = () => {
		const hasLoggedOut = logout();

		if (hasLoggedOut) {
			navigate('/');
		} else {
			alert('Something went wrong, try again later');
		}
	};

	const onPostSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target),
			formDataObj = Object.fromEntries(formData.entries());

		const blogObj = {
			title: formDataObj.title,
			author: formDataObj.author,
			url: formDataObj.url,
		};

		const response = await blogService.postNew(blogObj);
		if (response.status === 201) {
			getAllBlogs();
		} else {
			alert('Something went wrong, try again later');
		}
		handleClose();
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
			<Button className="m-2" variant="primary" onClick={handleShow}>
				Create new blog
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Post a new blog</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form className="container" onSubmit={onPostSubmit}>
						<Form.Group className="mb-3" controlId="title-input">
							<Form.Label>Title:</Form.Label>
							<Form.Control
								name="title"
								type="text"
								placeholder="Enter title"
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="author-input">
							<Form.Label>Author:</Form.Label>
							<Form.Control
								name="author"
								type="text"
								placeholder="Enter author name"
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="url-input">
							<Form.Label>URL:</Form.Label>
							<Form.Control
								name="url"
								type="text"
								placeholder="Enter the blog URL"
								required
							/>
						</Form.Group>

						<Button variant="primary" type="submit">
							Post
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
			{blogs.map((blog) => (
				<Blog key={blog._id} blog={blog} />
			))}
		</div>
	);
};

export default App;
