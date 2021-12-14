const express = require('express');
const router = express.Router();
const {
	getAllBlogs,
	postNewBlogs,
	deleteBlog,
	updateBlog,
} = require('../utils/blogUtils');

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

router.delete('/api/blogs', async (request, response) => {
	const { id } = request.body;
	const res = await deleteBlog(id);
	response.json(res);
});

router.patch('/api/blogs', async (request, response) => {
	const { updates, id } = request.body;
	const res = await updateBlog(id, updates);
	response.json(res);
});

module.exports = router;
