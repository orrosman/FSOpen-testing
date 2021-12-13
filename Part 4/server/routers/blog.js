const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Blog } = require('../models/Blog');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);

router.get('/api/blogs', (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

router.post('/api/blogs', (request, response) => {
	const blog = new Blog(request.body);

	blog.save().then((result) => {
		response.status(201).json(result);
	});
});

module.exports = router;
