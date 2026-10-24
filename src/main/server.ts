import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { userRoutes } from '../presentation/routes/userRoutes';
import { swaggerDocument } from '../presentation/docs/swagger';
import { requestLogger } from '../presentation/middlewares/requestLogger';

const app = express();
app.use(express.json());

app.use('/users', requestLogger, userRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

const BANNER = `
██████╗  ██████╗  ██████╗██╗  ██╗███████╗██████╗      █████╗ ██╗    ██╗███████╗    ██╗      █████╗ ██████╗
██╔══██╗██╔═══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗    ██╔══██╗██║    ██║██╔════╝    ██║     ██╔══██╗██╔══██╗
██║  ██║██║   ██║██║     █████╔╝ █████╗  ██████╔╝    ███████║██║ █╗ ██║███████╗    ██║     ███████║██████╔╝
██║  ██║██║   ██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗    ██╔══██║██║███╗██║╚════██║    ██║     ██╔══██║██╔══██╗
██████╔╝╚██████╔╝╚██████╗██║  ██╗███████╗██║  ██║    ██║  ██║╚███╔███╔╝███████║    ███████╗██║  ██║██████╔╝
╚═════╝  ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝ ╚══╝╚══╝ ╚══════╝    ╚══════╝╚═╝  ╚═╝╚═════╝
`;

app.listen(PORT, () => {
	console.log(BANNER);
	console.log(`Servidor rodando na porta ${PORT}`);
	console.log(`Swagger: http://localhost:${PORT}/docs`);
});
