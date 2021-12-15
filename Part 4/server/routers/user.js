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

router.post('/', async (request, response) => {
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

router.get('/', async (request, response) => {
	response.json(await getAllUsers());
});

module.exports = router;
