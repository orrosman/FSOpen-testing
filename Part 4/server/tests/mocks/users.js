const mockUsers = [
	{ username: 'Test', name: 'Test Testy', password: '123456' },
	{ username: 'Testus', name: 'Testus Testy', password: '1234567' },
];

const mockNewUser = {
	username: 'Testimus',
	name: 'Test Testy',
	password: '123456',
};

const mockShortUsername = {
	username: 'Te',
	name: 'Test Testy',
	password: '123456',
	blogs: [],
};

const mockShortPassword = {
	username: 'Tester',
	name: 'Test Testy',
	password: '12',
	blogs: [],
};

const mockNewUserWithInfo = {
	username: 'Testimus',
	name: 'Test Testy',
	password: '123456',
	blogs: [
		{
			id: '5a422ba71b54a676234d17fb',
			title: 'TDD harms architecture',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		},
		{
			id: '5a422b891b54a676234d17fa',
			title: 'First class tests',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		},
	],
};

module.exports = {
	mockUsers,
	mockNewUser,
	mockShortUsername,
	mockShortPassword,
	mockNewUserWithInfo,
};
