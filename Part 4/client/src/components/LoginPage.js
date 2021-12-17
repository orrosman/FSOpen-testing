import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { login } from '../services/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
	let navigate = useNavigate();

	const onLoginSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target),
			formDataObj = Object.fromEntries(formData.entries());

		const credentials = {
			username: formDataObj.username,
			password: formDataObj.password,
		};
		const response = await login(credentials);

		if (response.status === 200) {
			window.localStorage.setItem(
				'authToken',
				JSON.stringify(response.data.token)
			);
			navigate('/blogs', {
				state: { name: response.data.name },
			});
		}
	};

	return (
		<div className="container">
			<h1>Login</h1>
			<Form onSubmit={onLoginSubmit}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						name="username"
						type="text"
						placeholder="Enter username"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						name="password"
						className="text-muted"
						type="password"
						placeholder="Password"
					/>
				</Form.Group>
				<Button type="submit">Login</Button>
			</Form>
		</div>
	);
}

export default LoginPage;
