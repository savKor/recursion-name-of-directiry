const http = require('http');
const express = require('express');
const WebSocket = require('ws');
const userConnection = require('./api/userConnection');
const userDiconnection = require('./api/userDiconnection');
const reportTheStatusOfTheGameStage = require('./api/gameLogic');
const fs = require('fs');

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
	userConnection(ws);

	ws.onmessage = (data) => {
		const dataParsed = JSON.parse(data);
		const dataAboutStatusOfTheGameForUsers = reportTheStatusOfTheGameStage(dataParsed, ws.id);
		if (dataAboutStatusOfTheGameForUsers !== undefined) {
			wss.clients.forEach(function(client) {
				client.send(JSON.stringify(dataAboutStatusOfTheGameForUsers));
			});
		}
	};

	ws.onclose = function() {
		userDiconnection(ws.id);
	};
});
const dir = './src/';

function checkDirection(dir) {
	const arrayFile = [];
	const arrayDirection = [];

	fs.readdirSync(dir).forEach((file) => {
		if (file.indexOf('.js') === -1) {
			arrayFile.push(file);
		} else {
			arrayDirection.push(file);
			const data = fs.readFileSync(dir + file, 'utf8');
			console.log(data);
		}
	});

	console.log(arrayFile);
	console.log(arrayDirection);
}

checkDirection(dir);

module.exports = server;
