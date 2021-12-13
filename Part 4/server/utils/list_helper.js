const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((sum, { likes }) => sum + likes, 0);
};

const favoriteBlog = (blogs) => {
	let mostLikedPost = blogs[0];
	for (const blog of blogs) {
		if (blog.likes > mostLikedPost.likes) {
			mostLikedPost = blog;
		}
	}
	return mostLikedPost;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};
