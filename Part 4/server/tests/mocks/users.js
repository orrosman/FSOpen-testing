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
};

const mockShortPassword = {
	username: 'Tester',
	name: 'Test Testy',
	password: '12',
};

module.exports = {
	mockUsers,
	mockNewUser,
	mockShortUsername,
	mockShortPassword,
};
