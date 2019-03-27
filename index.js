const express = require('express');

const PORT = process.env.PORT || 1337;

const app = express();

app.get('/exchange_github_code', (req, res) => {
	return res.json({
		lol: 'okay'
	});
});

app.listen(PORT, console.log('Git Gantt server running on port', PORT));