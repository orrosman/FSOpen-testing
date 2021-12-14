const express = require('express');
const router = express.Router();
const { register } = require('../utils/userUtils');

router.post('/', async (request, response) => {
	let newUser = request.body;

	if (
		!newUser.hasOwnProperty('username') &&
		!newUser.hasOwnProperty('name') &&
		!newUser.hasOwnProperty('password')
	) {
		response.status(400).send();
	} else {
		response.status(201).json(await register(newUser));
	}
});

module.exports = router;
