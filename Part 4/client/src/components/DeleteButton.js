import React from 'react';
import { Button } from 'react-bootstrap';
import blogService from '../services/blogs';

const DeleteButton = ({ blogId, updateBlogsList }) => (
	<Button
		className="p-1 ms-2"
		variant="warning"
		onClick={async () => {
			const answer = window.confirm(
				'Are you sure you want to delete this blog?'
			);
			if (answer) {
				const isDeleted = await blogService.deleteBlog(blogId);
				if (isDeleted) {
					const blogs = await blogService.getAll();
					updateBlogsList(blogs);
				}
			}
		}}
	>
		Delete Blog
	</Button>
);

export default DeleteButton;
