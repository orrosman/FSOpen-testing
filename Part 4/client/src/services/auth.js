import axios from 'axios';

const BASE_URL = 'http://localhost:3003/api';

const login = async (credentials) => {
	const response = await axios.post(`${BASE_URL}/users/login`, credentials);
	return response;
};

const logout = () => {
	window.localStorage.removeItem('authToken');
	window.localStorage.removeItem('name');
	if (
		window.localStorage.hasOwnProperty('authToken') ||
		window.localStorage.hasOwnProperty('name') ||
		window.localStorage.hasOwnProperty('username')
	) {
		return false;
	} else {
		return true;
	}
};

export { login, logout };
