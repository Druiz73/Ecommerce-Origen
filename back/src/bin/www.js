#!/usr/bin/env node

/**
 * Module dependencies.
 */
import fs from 'fs';
import app from '../app';
import debugLib from 'debug';
import https from 'https';

const debug = debugLib('express-es6-sample:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);


// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/jokker-jeans.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/jokker-jeans.com/fullchain.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/jokker-jeans.com/chain.pem', 'utf8');

const credentials = {
key: privateKey,
cert: certificate,
ca: ca
};

var cors = require('cors')
app.use(cors())

/**
 * Create HTTP server.
 */

const server = https.createServer(credentials,app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      /* eslint-disable no-console */
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log(`Listening on ${bind}`);
  debug('Listening on ' + bind);
}

