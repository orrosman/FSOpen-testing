const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: String,
	name: String,
	passwordHash: String,
	blogs: [],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
