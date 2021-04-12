// imports
const http = require('http');
const app = require('./app');

// Server listener
const server = http.createServer(app);
server.listen(8080, console.log('Server listen port: 8080'));
