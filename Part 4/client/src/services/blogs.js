import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

const TOKEN = `Bearer ${JSON.parse(window.localStorage.getItem('authToken'))}`;

axios.defaults.headers.common['Authorization'] = TOKEN;

const getAll = async () => {
	const request = await axios.get(baseUrl);
	return request.data;
};

const postNew = async (blogObj) => {
	const response = await axios.post(baseUrl, {
		...blogObj,
	});
	return response;
};

const likeBlog = async (blogId) => {
	const response = await axios.put(`${baseUrl}/${blogId}`);
	if (response.status === 200) {
		return response.data.likes;
	} else {
		return null;
	}
};

export default { getAll, postNew, likeBlog };
