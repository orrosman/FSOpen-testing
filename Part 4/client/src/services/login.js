import axios from 'axios';

const BASE_URL = 'http://localhost:3003/api';

export const login = async (credentials) => {
	const response = await axios.post(`${BASE_URL}/users/login`, credentials);
	return response;
};
