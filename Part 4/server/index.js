const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./routers/blog');
const userRouter = require('./routers/user');
const authenticate = require('./middleware/authenticate');

app.use(cors());
app.use(express.json());

app.use('/api/blogs', authenticate, blogRouter);
app.use('/api/users', userRouter);

const PORT = 3003;
const listener = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

app.close = () => {
	listener.close();
};

module.exports = app;
