const express = require('express');
const router = express.Router();
const { register, isUsernameExist } = require('../utils/userUtils');

router.post('/', async (request, response) => {
	let newUser = request.body;
	const isNewUsernameExist = await isUsernameExist(newUser.username);

	if (
		!newUser.hasOwnProperty('username') &&
		!newUser.hasOwnProperty('name') &&
		!newUser.hasOwnProperty('password')
	) {
		response.status(400).send();
	} else if (isNewUsernameExist) {
		response
			.status(406)
			.json(`User with username: ${newUser.username} already exists`);
	} else {
		response.status(201).json(await register(newUser));
	}
});

module.exports = router;
