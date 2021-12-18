import React from 'react';
import { Accordion } from 'react-bootstrap';

const Blog = ({ blog, eventKey }) => (
	// <Accordion flush>
	<Accordion.Item eventKey={eventKey}>
		<Accordion.Header>
			{blog.title} | {blog.author}
		</Accordion.Header>
		<Accordion.Body>
			{console.log(blog)}
			<p>
				URL:
				<a href={blog.url} target="_blank">
					{blog.url}
				</a>
			</p>
			<p>Likes: {blog.likes}</p>
			<p>User: {blog.user.username}</p>
		</Accordion.Body>
	</Accordion.Item>
	// </Accordion>
);

export default Blog;
