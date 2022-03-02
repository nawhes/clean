import 'reflect-metadata';
import express from 'express';
import _http from 'http';

import Logger from 'loaders/logger';
import loaders from 'loaders';
import config from 'config';

async function startServer() {
	const app = express();
	const http = _http.createServer(app);
	await loaders({ expressApp: app });

	http.listen(config.port, () => {
		Logger.info(`
    	################################################
    	🛡️  Server listening on port: ${config.port} 🛡️
    	################################################
      `);
	}).on('error', (err) => {
		Logger.error(err);
		process.exit(1);
	});
}

startServer();
