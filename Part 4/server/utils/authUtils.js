const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGO_URL);

const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (userObj) => {
	return jwt.sign(userObj, process.env.JWT_SECRET);
};

const validatePassword = async (plainTextPassword, hashedPassword) => {
	try {
		return await bcrypt.compare(plainTextPassword, hashedPassword);
	} catch (error) {
		return null;
	}
};

module.exports = { generateToken, validatePassword };
