const express = require('express');
const router = express.Router();
const { getAllBlogs, postNewBlogs } = require('../utils/blogUtils');

router.get('/api/blogs', async (request, response) => {
	response.json(await getAllBlogs());
});

router.post('/api/blogs', async (request, response) => {
	const newBlog = request.body;

	response.status(201).json(await postNewBlogs(newBlog));
});

module.exports = router;
