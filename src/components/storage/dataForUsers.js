const gameData = require('./gameData');

const getGameInformationForUsers = () => ({
	player1: gameData.playersData[0].username,
	player2: gameData.playersData[1].username,
	arrayOfMissedShotPlayer1: gameData.playersData[0].arrayOfMissedShot,
	arrayOfMissedShotPlayer2: gameData.playersData[1].arrayOfMissedShot,
	arrayOfShotShipsPlayer1: gameData.playersData[0].arrayOfShotShips,
	arrayOfShotShipsPlayer2: gameData.playersData[1].arrayOfShotShips,
	turn: gameData.turn,
	winner: gameData.winner
});

module.exports = getGameInformationForUsers;
