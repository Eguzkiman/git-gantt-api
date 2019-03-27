const express = require('express');
const request = require('request');

const PORT = process.env.PORT || 1337;

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/access_token';
// const GITHUB_AUTH_URL = 'https://requestinspector.com/inspect/01d70d7y8rpvv9ppdhg0p8sqd3';
const GITHUB_CLIENT_ID = '14de362467e571d25b4f';	
// const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;	
const GITHUB_CLIENT_SECRET = '20d53c40e733adf314f5a8e2e74d41601e96cd61';
// const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const app = express();
app.use(express.json())

app.post('/exchange_github_code', (req, res) => {
	let code = req.body.code;

	if (!code) return res.status(400).send('code parameter is required');
	
	let body = JSON.stringify({
		code,
		client_id: GITHUB_CLIENT_ID,
		client_secret: GITHUB_CLIENT_SECRET
	});

	let headers = {
		"Content-Type": "application/json",
		"Accept": "application/json"
	};

	request.post({ url: GITHUB_AUTH_URL, headers, body }, (err, response, body) => {
		return res.status(response.statusCode).send(err || body);
	});

});

app.listen(PORT, console.log('Git Gantt server running on port', PORT));