const express = require('express');
const request = require('request');
var cors = require('cors');

const PORT = process.env.PORT || 1337;

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/access_token';
const REDIRECT_URL = process.env.REDIRECT_URL;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;	
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const app = express();
// app.use(express.json());
app.use(cors());

app.get('/github_callback', (req, res) => {
	let code = req.query.code;

	if (!code) return res.status(400).send('code parameter is required');
	
	let body = JSON.stringify({
		code,
		client_id: GITHUB_CLIENT_ID,
		client_secret: GITHUB_CLIENT_SECRET,
	});

	let headers = {
		"Content-Type": "application/json",
		"Accept": "application/json"
	};

	request.post({ url: GITHUB_AUTH_URL, headers, body }, (err, response, body) => {
		// return res.status(response.statusCode).send(err || body);
		let { access_token } = JSON.parse(body);
		return res.redirect(REDIRECT_URL + '?access_token=' + access_token);
	});

});

app.listen(PORT, console.log('Git Gantt server running on port', PORT));