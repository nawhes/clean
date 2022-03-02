import AcademyService from 'services/AcademyService';
import express, { Request, Response, NextFunction } from 'express';
import Container from 'typedi';

const api = (): express.Router => {
	const router = express.Router();
	const academyService = Container.get(AcademyService);

	router.get('/setup', (req: Request, res: Response, next: NextFunction) => {
		academyService.setup();
		res.send({ data: 'setup' });
	});

	router.get('/test', (req: Request, res: Response, next: NextFunction) => {
		academyService.test();
		res.send({ data: '?' });
	});
	return router;
};

export default api;
