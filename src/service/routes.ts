import { Router } from 'express';
import routerApp from '@services/api/v1/routes';

const appRouter: Router = Router();
appRouter.use('/v1', routerApp);
export default appRouter;
