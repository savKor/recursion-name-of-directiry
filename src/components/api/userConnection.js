const gameData = require('../storage/gameData');
const getUserData = require('../storage/userData');

function getUniqueID() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return s4() + s4() + '-' + s4();
}

function userConnection(ws) {
	if (gameData.playersData.length < 2) {
		ws.id = getUniqueID();
		console.log(`New client connected with id: ${ws.id}`);
		const newUser = getUserData(ws.id);
		gameData.playersData.push(newUser);
	} else {
		console.log('Страница уже занята двумя игроками');
	}
}

module.exports = userConnection;
