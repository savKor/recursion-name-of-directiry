const gameData = require('../storage/gameData');
const getGameInformationForUsers = require('../storage/dataForUsers');
const stagesOfTheGame = require('../storage/stateMachine');

function reportTheStatusOfTheGameStage(data, userId) {
	if (userId === undefined) {
		console.log('ты не можешь зайти');
	} else {
		const dataOfTheEnemy = gameData.playersData.find((x) => x.userId !== userId);
		const dataOfThePlayer = gameData.playersData.find((x) => x.userId === userId);
		if (stagesOfTheGame.state === 'registration') {
			gameData.counter += 1;
			dataOfThePlayer.username = data;

			if (gameData.counter === 2) {
				const playersRegistrationStatus = stagesOfTheGame.login();
				return playersRegistrationStatus;
			}
		} else if (stagesOfTheGame.state === 'putShips') {
			gameData.counter += 1;
			dataOfThePlayer.ships = data;

			if (gameData.counter === 2) {
				const gameDataForUsers = stagesOfTheGame.getInfo();
				return gameDataForUsers;
			}
		} else {
			const updatedGameDataForUsers = checkIfYouHitShipOrNot(dataOfTheEnemy, dataOfThePlayer, data);
			return updatedGameDataForUsers;
		}
	}
}

function checkIfYouHitShipOrNot(dataOfTheEnemy, dataOfThePlayer, data) {
	let updatedGameDataForUsers;
	const cell = data;
	const hitInShip = dataOfTheEnemy.ships.find((x) => x === cell);

	if (hitInShip) {
		updatedGameDataForUsers = checkIfYouWinOrNot(dataOfThePlayer, cell);
		return updatedGameDataForUsers;
	} else {
		if (stagesOfTheGame.state === 'player1') {
			updatedGameDataForUsers = stagesOfTheGame.player2Turn(dataOfThePlayer, cell);
		} else {
			updatedGameDataForUsers = stagesOfTheGame.player1Turn(dataOfThePlayer, cell);
		}

		return updatedGameDataForUsers;
	}
}

function checkIfYouWinOrNot(dataOfThePlayer, cell) {
	let statusWhetherUserWonOrNot;
	dataOfThePlayer.arrayOfShotShips.push(cell);
	if (dataOfThePlayer.arrayOfShotShips.length === 20) {
		gameData.winner = dataOfThePlayer.username;
		stagesOfTheGame.findShips();
		statusWhetherUserWonOrNot = getGameInformationForUsers();
	} else {
		statusWhetherUserWonOrNot = getGameInformationForUsers();
	}

	return statusWhetherUserWonOrNot;
}

module.exports = reportTheStatusOfTheGameStage;
