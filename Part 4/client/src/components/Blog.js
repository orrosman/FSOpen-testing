import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import LikeButton from './LikeButton';

const Blog = ({ blog, eventKey }) => {
	const [likes, setLikes] = useState(blog.likes);

	return (
		<Accordion.Item eventKey={eventKey}>
			<Accordion.Header>
				{blog.title} | {blog.author}
			</Accordion.Header>
			<Accordion.Body>
				<p>
					URL:
					<a href={blog.url} target="_blank" rel="noreferrer">
						{blog.url}
					</a>
				</p>
				<p>
					Likes: {likes} <LikeButton setLikes={setLikes} blogId={blog._id} />
				</p>
				<p>User: {blog.user.username}</p>
			</Accordion.Body>
		</Accordion.Item>
	);
};

export default Blog;
