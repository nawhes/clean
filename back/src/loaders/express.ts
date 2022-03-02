import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

import api from 'api';
import config from 'config';
import CommonError from 'errors/CommonError';

export default async ({ app }: { app: express.Application }): Promise<void> => {
	app.get('/status', (req: Request, res: Response) => {
		res.status(200).end();
	});
	app.head('/status', (req: Request, res) => {
		res.status(200).end();
	});

	app.enable('trust proxy');
	app.use(morgan('tiny'));
	app.use(cors({ origin: config.clientURL, credentials: true }));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());

	app.use('/api', api());

	/// catch 404 and forward to error handler
	app.use((req, res, next) => {
		const err = new CommonError('Not Found');
		err.status = 404;
		next(err);
	});

	/// error handlers
	app.use((err: CommonError | Error | unknown, req: Request, res: Response, next: NextFunction) => {
		if (!(err instanceof CommonError)) return next(err);
		return res.status(err.status).send({ message: err.message }).end();
	});
	app.use((err: unknown, req: Request, res: Response) => {
		console.error(err);
		res.status(500).json({ message: 'UNKNOWN ERROR' });
	});
};
