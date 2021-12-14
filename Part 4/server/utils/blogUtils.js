const mongoose = require('mongoose');
const Blog = require('../models/Blog');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);

const getAllBlogs = async () => {
	return await Blog.find({});
};

const postNewBlogs = async (newBlog) => {
	const blog = new Blog(newBlog);
	return await blog.save();
};

const deleteBlog = async (id) => {
	return await Blog.findOneAndDelete({ _id: id });
};

const updateBlog = async (id, updates) => {
	return await Blog.findOneAndUpdate({ _id: id }, { $set: updates });
};

module.exports = { getAllBlogs, postNewBlogs, deleteBlog, updateBlog };
