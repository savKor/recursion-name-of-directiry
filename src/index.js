const config = require('./config');
const server = require('./server');

// Boot Server
const port = process.env.PORT || config.port;

server.listen(port, () => {
	console.log('Server running on', port);
});
