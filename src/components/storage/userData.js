const getUserData = (id) => ({
	userId: id,
	username: null,
	ships: [],
	arrayOfShotShips: [],
	arrayOfMissedShot: [],
	directoryName:'./src/components/storage/userData.js',
});

module.exports = getUserData;
