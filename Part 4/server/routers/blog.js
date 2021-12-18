const express = require('express');
const { findByIdAndUpdate } = require('../models/User');
const router = express.Router();
const {
	getAllBlogs,
	postNewBlogs,
	deleteBlog,
	updateBlog,
	hasProperties,
	isBlogCreator,
	likeBlog,
} = require('../utils/blogUtils');

router.get('/', async (request, response) => {
	response.json(await getAllBlogs());
});

router.post('/', async (request, response) => {
	let newBlog = request.body;
	newBlog = { ...newBlog, user: { ...request.user } };
	if (!hasProperties(newBlog)) {
		response.status(400).json();
	} else if (!newBlog.hasOwnProperty('likes')) {
		newBlog = { ...newBlog, likes: 0 };
		response.status(201).json(await postNewBlogs(newBlog));
	} else {
		response.status(201).json(await postNewBlogs(newBlog));
	}
});

router.delete('/', async (request, response) => {
	const { id: blogId } = request.body;
	const { id: userId } = request.user;

	const isCreator = await isBlogCreator(blogId, userId);

	if (isCreator) {
		const res = await deleteBlog(blogId);
		response.json(res);
	} else {
		response.json("You can't delete a blog that isn't yours");
	}
});

router.patch('/', async (request, response) => {
	const { updates, id } = request.body;
	const res = await updateBlog(id, updates);
	response.json(res);
});

router.put('/:id', async (request, response) => {
	const { id } = request.params;
	const res = await likeBlog(id);
	response.json(res);
});

module.exports = router;
