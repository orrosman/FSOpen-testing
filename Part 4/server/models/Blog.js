const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	user: {
		username: String,
		name: String,
	},
	url: String,
	likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
