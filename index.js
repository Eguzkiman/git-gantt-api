const express = require('express');

const PORT = process.env.PORT || 1337;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const app = express();

app.get('/exchange_github_code', (req, res) => {
	let isOk = GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET
	return res.json({ isOk });
});

app.listen(PORT, console.log('Git Gantt server running on port', PORT));