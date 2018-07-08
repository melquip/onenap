const http = require('http');
const path = require('path');
const express = require('express');
/* USUALLY USED */
const logger = require('morgan');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
/* CSS PRE-PROCESSORS */
const stylus = require('stylus');
const nib = require('nib');
/* TEMPLATE RENDERING */
const pug = require('pug');
/* OTHERS */
const _ = require('lodash');
const _fp = require('lodash/fp');

//const MongoClient = require('mongodb').MongoClient;
//const db = require('./config.js');

/* BACKOFFICE RENDERING */
import React from 'react';
//import { renderToString } from 'react-dom/server';
//import renderFullPage from './renderFullPage';

const app = express();

const log = console.info.bind(console);
const logErr = console.error.bind(console);

const port = normalizePort(process.env.PORT || '3000');

/* SERVER PORT */
app.set('port', port);

app.use(logger('dev'));
/* was 'dev' */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


/* USE stylus AS YOUR CSS PRE-PROCESSOR */
/*
app.use(stylus.middleware({
	src: path.join(__dirname, 'public/css'),
	compile: (str, path) => {
		log("\nCompiled Stylus: "+ path + "\n\n");
		return stylus(str).set('filename', path).set('compress', true).use(nib()).import('nib');
	},
}));
*/

/* USE THIS FOLDER FOR USER WEBSITE */
//app.use(express.static(path.resolve(__dirname)));
/* PUT YOUR TEMPLATING / HTML FILES HERE */
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');


/* ROUTING */

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js')();
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath
}));


app.use(express.static(path.resolve(__dirname, '/admin')));

const apiRouter = express.Router();
apiRouter.get('/admin', (req, res) => {
	console.log("\napiRouter:", process.cwd(), req.url, path.resolve(__dirname, 'admin/index.html'));
	res.sendFile(process.cwd() + '/admin/src/_nav');
});

app.use('/admin', apiRouter);

app.get('/admin', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'admin/index.html')); //
});


/*
app.get('*', (req, res) => {
	log("\nstatic", path.resolve(__dirname),
		"file_url:", __dirname,
		"request:", req.url);
	if(req.url === '/admin/') {
		log("resolving: /admin/ -> index.html");
		res.sendFile(path.resolve(__dirname, 'admin/index.html'));
	} else if(req.url.indexOf('/admin/') > -1) {
		log("resolving:", path.resolve(__dirname + req.url));//.replace('/admin', '')
		res.sendFile(path.resolve(__dirname + req.url));//.replace('/admin', '')
	} else {
		res.sendStatus(404);
	}
});
*/

app.listen(port);
log(`Listening at http://localhost:${port}`);

function normalizePort(val) {
	let port = parseInt(val, 10);
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

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}
	
	let bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;
	
	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
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

function onListening() {
	let addr = server.address();
	let bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	debug('Listening on ' + bind);
}
