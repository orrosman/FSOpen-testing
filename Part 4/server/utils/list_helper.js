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

const mostBlogs = (blogs) => {
	const authorsList = {};

	//map authors to {author name:number of posts}
	for (const blog of blogs) {
		if (blog.author in authorsList) {
			authorsList[blog.author]++;
		} else {
			authorsList[blog.author] = 1;
		}
	}

	//find the author with the most posts
	const highestQuantityAuthor = Object.keys(authorsList).reduce(
		(entry, highest) =>
			authorsList[entry] > authorsList[highest] ? entry : highest
	);

	return {
		author: highestQuantityAuthor,
		blogs: authorsList[highestQuantityAuthor],
	};
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
};
