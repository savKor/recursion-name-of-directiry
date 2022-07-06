const gameData = require('../storage/gameData');

function userDiconnection(userId) {
	console.log(`Client ${userId} has disconnected!`);
	const newData = gameData.playersData.filter((data) => data.userId != userId);
	gameData.playersData = newData;
}
function name(params) {}
module.exports = userDiconnection;
