const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const register = async (user) => {
	const hashedPassword = await encryptPassword(user.password);
	if (hashedPassword) {
		const newUser = new User({
			username: user.username,
			name: user.name,
			passwordHash: hashedPassword,
		});
		return await newUser.save();
	} else {
		return { error: 'Register was unsuccessful' };
	}
};

const encryptPassword = async (password) => {
	try {
		return await bcrypt.hash(password, saltRounds);
	} catch (error) {
		return null;
	}
};

module.exports = { register };
