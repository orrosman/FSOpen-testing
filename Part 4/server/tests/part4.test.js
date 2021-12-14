const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const BlogMocks = require('./mocks/blogs');
const supertest = require('supertest');
const app = require('../index');

const request = supertest(app);

const listHelper = require('../utils/list_helper');

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(BlogMocks.mockBlogs);
});

describe('Basic blog routers tests:', () => {
	test('dummy returns one', () => {
		const blogs = [];

		const result = listHelper.dummy(blogs);
		expect(result).toBe(1);
	});

	test('Sum all blog posts likes', () => {
		const totalLikes = listHelper.totalLikes(BlogMocks.mockBlogs);
		expect(totalLikes).toBe(36);
	});

	test('Blog post with most likes', () => {
		const mostLikedPost = listHelper.favoriteBlog(BlogMocks.mockBlogs);
		expect(mostLikedPost).toEqual(BlogMocks.mockBlogs[2]);
	});

	test('Author with most blog posts', () => {
		const highestQuantityAuthor = listHelper.mostBlogs(BlogMocks.mockBlogs);
		expect(highestQuantityAuthor).toEqual({
			author: 'Robert C. Martin',
			blogs: 3,
		});
	});

	test('Most liked author', () => {
		const highestQuantityAuthor = listHelper.mostLikedAuthor(
			BlogMocks.mockBlogs
		);
		expect(highestQuantityAuthor).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17,
		});
	});
});

describe('test server - part 4 section B', () => {
	test('Blogs are returned as json', async () => {
		const response = await request.get('/api/blogs');
		expect(response.body.length).toBe(BlogMocks.mockBlogs.length);
	});

	test('Test ID exists', async () => {
		const response = await request.get('/api/blogs');
		response.body.map(({ _id }) => {
			expect(_id).toBeDefined();
		});
	});

	test('Create new blog', async () => {
		const response = await request
			.post('/api/blogs')
			.send({ ...BlogMocks.fakePostBlog });
		expect(response.body).toEqual(
			expect.objectContaining(BlogMocks.fakePostBlog)
		);
	});

	test('New blog post without like property would default to 0', async () => {
		const response = await request
			.post('/api/blogs')
			.send({ ...BlogMocks.fakePostBlogNoLike });
		expect(response.body).toEqual(
			expect.objectContaining({ ...BlogMocks.fakePostBlogNoLike, likes: 0 })
		);
	});

	test('New blog post without a title & url properties would return 400', async () => {
		const response = await request
			.post('/api/blogs')
			.send({ ...BlogMocks.fakePostBlogNoTitle });
		expect(response.statusCode).toBe(400);
	});

	test('Can delete a post', async () => {
		const response = await request
			.delete('/api/blogs')
			.send({ id: BlogMocks.mockBlogs[0]._id });
		expect(response.body).toEqual(BlogMocks.mockBlogs[0]);
	});

	test('Can update a blog post', async () => {
		const response = await request.patch('/api/blogs').send({
			id: BlogMocks.mockBlogs[0]._id,
			updates: { ...BlogMocks.fakeUpdatedBlog },
		});

		expect(response.body).toEqual(BlogMocks.mockBlogs[0]);
	});

	afterAll(() => {
		mongoose.connection.close();
		app.close();
	});
});
