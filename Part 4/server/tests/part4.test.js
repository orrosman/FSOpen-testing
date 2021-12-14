const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const supertest = require('supertest');
const app = require('../index');

const request = supertest(app);

const listHelper = require('../utils/list_helper');

const mockBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0,
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0,
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0,
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0,
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0,
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0,
	},
];

const fakePostBlog = {
	title: 'Testing Post',
	author: 'Test Testington',
	url: 'https://testtest.example/',
	likes: 42,
};

const fakePostBlogNoLike = {
	title: 'Testing Post',
	author: 'Test Testington',
	url: 'https://testtest.example/',
};

const fakePostBlogNoTitle = {
	author: 'Test Testington',
	likes: 42,
};

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(mockBlogs);
});

describe('Basic blog routers tests:', () => {
	test('dummy returns one', () => {
		const blogs = [];

		const result = listHelper.dummy(blogs);
		expect(result).toBe(1);
	});

	test('Sum all blog posts likes', () => {
		const totalLikes = listHelper.totalLikes(mockBlogs);
		expect(totalLikes).toBe(36);
	});

	test('Blog post with most likes', () => {
		const mostLikedPost = listHelper.favoriteBlog(mockBlogs);
		expect(mostLikedPost).toEqual(mockBlogs[2]);
	});

	test('Author with most blog posts', () => {
		const highestQuantityAuthor = listHelper.mostBlogs(mockBlogs);
		expect(highestQuantityAuthor).toEqual({
			author: 'Robert C. Martin',
			blogs: 3,
		});
	});

	test('Most liked author', () => {
		const highestQuantityAuthor = listHelper.mostLikedAuthor(mockBlogs);
		expect(highestQuantityAuthor).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 17,
		});
	});
});

describe('test server - part 4 section B', () => {
	test('Blogs are returned as json', async () => {
		const response = await request.get('/api/blogs');
		expect(response.body.length).toBe(mockBlogs.length);
	});

	test('Test ID exists', async () => {
		const response = await request.get('/api/blogs');
		response.body.map(({ _id }) => {
			expect(_id).toBeDefined();
		});
	});

	test('Create new blog', async () => {
		const response = await request.post('/api/blogs').send({ ...fakePostBlog });
		expect(response.body).toEqual(expect.objectContaining(fakePostBlog));
	});

	test('New blog post without like property would default to 0', async () => {
		const response = await request
			.post('/api/blogs')
			.send({ ...fakePostBlogNoLike });
		expect(response.body).toEqual(
			expect.objectContaining({ ...fakePostBlogNoLike, likes: 0 })
		);
	});

	test('New blog post without a title & url properties would return 400', async () => {
		const response = await request
			.post('/api/blogs')
			.send({ ...fakePostBlogNoTitle });
		expect(response.statusCode).toBe(400);
	});

	test('Can delete a post', async () => {
		const dbPostCopy = await (
			await request.post('/api/blogs').send({ ...fakePostBlog })
		).body;
		const fakePostId = dbPostCopy._id;
		const response = await request
			.delete('/api/blogs')
			.send({ id: fakePostId });
		expect(response.body).toEqual(dbPostCopy);
	});

	afterAll(() => {
		mongoose.connection.close();
		app.close();
	});
});
