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
		const isNewUser = await newUser.save();
		if (isNewUser) {
			return `User with username: ${isNewUser.username} was created`;
		}
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

const isUsernameExist = async (newUsername) => {
	return Boolean(await User.findOne({ username: newUsername }));
};

const getAllUsers = async () => {
	return await User.find({});
};

const checkUsername = (username) => {
	return username.length >= 3 ? true : false;
};

const checkPassword = (password) => {
	return password.length >= 3 ? true : false;
};

const checkProperties = (user) => {
	return (
		user.hasOwnProperty('username') &&
		user.hasOwnProperty('name') &&
		user.hasOwnProperty('password') &&
		user.hasOwnProperty('blogs')
	);
};

module.exports = {
	register,
	isUsernameExist,
	getAllUsers,
	checkUsername,
	checkPassword,
	checkProperties,
};
