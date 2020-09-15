import App from './app';

const http = require('http');
const express = new App().getExpress();
const port = process.env.PORT || 8080;
express.set('port', port);

const onListening = (): void => {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}

const server = http.createServer(express);
server.listen(port);
server.on('listening', onListening);
