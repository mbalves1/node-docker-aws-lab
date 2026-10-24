import { NextFunction, Request, Response } from 'express';

// Loga cada requisição quando a resposta termina: horário, método, rota, status e tempo
export const requestLogger = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const start = Date.now();

	res.on('finish', () => {
		const time = new Date().toISOString();
		const duration = Date.now() - start;
		const body =
			req.body && Object.keys(req.body).length
				? ` body=${JSON.stringify(req.body)}`
				: '';

		console.log(
			`[${time}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms${body}`,
		);
	});

	next();
};
