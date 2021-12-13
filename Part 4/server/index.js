const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./routers/blog');

app.use(cors());
app.use(express.json());

app.use('/', blogRouter);

const PORT = 3003;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = app;
