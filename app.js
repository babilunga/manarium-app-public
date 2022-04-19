import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import createError from 'http-errors';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

// ** my modules
import apiRouter from './routes/api.js';
// import { connectMongoDb } from './utils/mongodb.config.js';
// import getTokenPrice from './utils/getTokenPrice.js';
// import refEventSubscription from './utils/refEventSubscription.js';

// import './lib/cron.js';

// ** Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || '8080');

const app = express();
Sentry.init({
	dsn: 'https://e222206926b4473d87a027b033f7d8cc@o1118068.ingest.sentry.io/6151912',
	integrations: [
		// enable HTTP calls tracing
		new Sentry.Integrations.Http({ tracing: true }),
		// enable Express.js middleware tracing
		new Tracing.Integrations.Express({ app }),
	],
	tracesSampleRate: 1.0,
});
app.set('port', port);
app.set('trust proxy', true);

// ** Create HTTP server.

var server = http.createServer(app);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// ** Listen on provided port, on all network interfaces.
server.listen(port);

// The error handler must be before any other error middleware and after all controllers
app.use(
	Sentry.Handlers.errorHandler({
		shouldHandleError(error) {
			// Capture all 404 and 500 errors
			if (error.status >= 400) {
				return true;
			}
			return false;
		},
	})
);

server.on('error', onError);
server.on('listening', onListening);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'client/build'))); // **Serve static files from the React app

app.use('/api', apiRouter);

// ** The "catchall" handler: for any request that doesn't
// ** match one above, send back React's index.html file.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// ** catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// ** error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');

	next();
});

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

//  ** Event listener for HTTP server "error" event
function onError(error) {
	try {
		if (error.syscall !== 'listen') {
			throw error;
		}

		var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

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
	} catch (error) {
		console.log(error);
	}
}

// ** Event listener for HTTP server "listening" event
async function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	console.log('Listening on ' + bind);

	// Commented for dev version
	// await connectMongoDb();

	// setInterval(() => {
	// 	getTokenPrice();
	// }, 20000);

	// ** Commented for dev version
	// refEventSubscription();
}
