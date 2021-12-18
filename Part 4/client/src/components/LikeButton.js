import React from 'react';
import { Button } from 'react-bootstrap';
import blogService from '../services/blogs';

const LikeButton = ({ blogId, setLikes }) => (
	<Button
		className="p-0 ms-2"
		variant="outline-danger"
		onClick={async () => {
			const updatedLikes = await blogService.likeBlog(blogId);
			if (updatedLikes) {
				setLikes(updatedLikes);
			}
		}}
	>
		Like💖
	</Button>
);

export default LikeButton;
