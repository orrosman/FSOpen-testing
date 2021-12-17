const express = require('express');
const router = express.Router();
const {
	register,
	isUsernameExist,
	getAllUsers,
	checkUsername,
	checkPassword,
	checkProperties,
} = require('../utils/userUtils');

const { generateToken, validatePassword } = require('../utils/authUtils');

router.post('/register', async (request, response) => {
	let newUser = request.body;

	if (!checkProperties(newUser)) {
		response.status(400).send();
	} else if (!checkUsername(newUser.username)) {
		response
			.status(406)
			.json('Username and password must be at least 3 characters long');
	} else if (!checkPassword(newUser.password)) {
		response
			.status(406)
			.json('Username and password must be at least 3 characters long');
	} else {
		const isNewUsernameExist = await isUsernameExist(newUser.username);
		if (isNewUsernameExist) {
			response
				.status(406)
				.json(`User with username: ${newUser.username} already exists`);
		} else {
			response.status(201).json(await register(newUser));
		}
	}
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	const user = await isUsernameExist(username);
	if (user) {
		const isPasswordCorrect = await validatePassword(
			password,
			user.passwordHash
		);
		if (isPasswordCorrect) {
			const token = generateToken({
				username: username,
				id: user._id,
				name: user.name,
			});
			res.json(token);
		} else {
			res.json('Password in invalid');
		}
	} else {
		res.json('User was not found');
	}
});

router.get('/', async (request, response) => {
	response.json(await getAllUsers());
});

module.exports = router;
