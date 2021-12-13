const mongoose = require('mongoose');
const testBlogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});

const testBlog = mongoose.model('testBlog', testBlogSchema);

module.exports = testBlog;
