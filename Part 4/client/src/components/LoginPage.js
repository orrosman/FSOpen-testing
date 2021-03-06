import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { login } from '../services/auth';
import { Notyf } from 'notyf';
import PropTypes from 'prop-types';

const notyf = new Notyf();

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

		credentials.propTypes = {
			username: PropTypes.string.isRequired,
			password: PropTypes.string.isRequired,
		};
		const response = await login(credentials);

		if (response.status === 200) {
			window.localStorage.setItem(
				'authToken',
				JSON.stringify(response.data.token)
			);
			window.localStorage.setItem('name', JSON.stringify(response.data.name));
			window.localStorage.setItem('username', formDataObj.username);
			notyf.success('Logged In');
			navigate('/blogs', {
				state: { name: response.data.name },
			});
		} else {
			notyf.error(response.data);
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
