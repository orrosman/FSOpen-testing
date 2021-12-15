const express = require('express');
const router = express.Router();
const {
	getAllBlogs,
	postNewBlogs,
	deleteBlog,
	updateBlog,
	hasProperties,
} = require('../utils/blogUtils');

router.get('/', async (request, response) => {
	response.json(await getAllBlogs());
});

router.post('/', async (request, response) => {
	let newBlog = request.body;
	console.log(hasProperties(newBlog));
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
	const { id } = request.body;
	const res = await deleteBlog(id);
	response.json(res);
});

router.patch('/', async (request, response) => {
	const { updates, id } = request.body;
	const res = await updateBlog(id, updates);
	response.json(res);
});

module.exports = router;
