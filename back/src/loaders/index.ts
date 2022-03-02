import express from 'express';
import expressLoader from './express';
import typeormLoader from './typeorm';
import Logger from './logger';

export default async ({ expressApp }: { expressApp: express.Application }): Promise<void> => {
	await typeormLoader();
	Logger.info('✌️ Typeorm loaded');
	await expressLoader({ app: expressApp });
	Logger.info('✌️ Express loaded');

	// ... more loaders can be here
};
