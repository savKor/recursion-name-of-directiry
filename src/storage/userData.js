const getUserData = (id) => ({
	userId: id,
	username: null,
	ships: [],
	arrayOfShotShips: [],
	arrayOfMissedShot: []
});

module.exports = getUserData;
