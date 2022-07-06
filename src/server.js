const http = require('http');
const express = require('express');
const WebSocket = require('ws');
const userConnection = require('./components/api/userConnection');
const userDiconnection = require('./components/api/userDiconnection');
const reportTheStatusOfTheGameStage = require('./components/api/gameLogic');
const fs = require('fs');

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

let folder = './src/components/';

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

function checkContentOfAFolder(folder) {
	let arrayOfFiles = [];
	let arrayOfFolders = [];

	fs.readdirSync(folder).forEach((file) => {
		if (file.indexOf('.js') === -1) {
			arrayOfFolders.push(file);
		} else if (file.indexOf('.json') === -1) {
			arrayOfFiles.push(file);
			let data = fs.readFileSync(folder + file, 'utf8');
		}
	});
	console.log(arrayOfFiles, arrayOfFolders);

	return [ arrayOfFiles, arrayOfFolders ];
}

// RegExp ->

//str.replace(/nameDireection: (.*)/, (_) => 'AAA');
//str.replace(/(nameDirection: )(.*)/, '$1 AAAAAA')

// nameDireection: /dfdsf
// nameDireection: scr/fgd
function hadleFolderNamesForFiles(folder) {
	let arrayOfFoldersAndFiles = checkContentOfAFolder(folder);
	let arrayOfFiles = arrayOfFoldersAndFiles[0];
	let arrayOfFolders = arrayOfFoldersAndFiles[1];

	if (arrayOfFolders.length === 0) {
		if (arrayOfFiles.length === 0) {
			console.log('Нет файлов');
		} else {
			addDirectiryToFile(arrayOfFiles, folder);
		}
	} else {
		addDirectiryToFile(arrayOfFiles, folder);
		for (let i = 0; i < arrayOfFolders.length; i++) {
			let newFolder = folder + arrayOfFolders[i] + '/';
			hadleFolderNamesForFiles(newFolder);
		}
	}
}

function addDirectiryToFile(files, folder) {
	for (let i = 0; i < files.length; i++) {
		const newFolder = folder + files[i];
		let data = fs.readFileSync(newFolder, 'utf8');
		let newData = data.replace(/(directoryName: )(.*)/, `$1'${newFolder}',`);
		if (data !== newData) {
			fs.writeFileSync(newFolder, newData);
		}
	}
}

hadleFolderNamesForFiles(folder);

module.exports = server;
