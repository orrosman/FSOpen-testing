const express = require('express');
const router = express.Router();
const { getAllBlogs, postNewBlogs } = require('../utils/blogUtils');

router.get('/api/blogs', async (request, response) => {
	response.json(await getAllBlogs());
});

router.post('/api/blogs', async (request, response) => {
	let newBlog = request.body;

	if (!newBlog.hasOwnProperty('title') && !newBlog.hasOwnProperty('url')) {
		response.status(400).send();
	} else if (!newBlog.hasOwnProperty('likes')) {
		newBlog = { ...newBlog, likes: 0 };
		response.status(201).json(await postNewBlogs(newBlog));
	} else {
		response.status(201).json(await postNewBlogs(newBlog));
	}
});

module.exports = router;
