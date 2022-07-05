const getUserData = (id) => ({
	userId: id,
	username: null,
	ships: [],
	arrayOfShotShips: [],
	arrayOfMissedShot: [],
	directoryName: null
});

module.exports = getUserData;
