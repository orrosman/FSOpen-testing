import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

const getAll = async () => {
	const request = await axios.get(baseUrl, {
		headers: {
			Authorization: `Bearer ${JSON.parse(
				window.localStorage.getItem('authToken')
			)}`,
		},
	});
	return request.data;
};

export default { getAll };
