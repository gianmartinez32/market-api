import { Router } from 'express';
import container from '@container';
import { validateSchema } from '@libraries/middlewares/validate-schema.middlewares';
import { PlayerController } from './player.controllers';
import { createPlayer, getPlayer, updatePlayer } from './player.schema';

const app: Router = Router();
const playerController = container.get<PlayerController>(PlayerController);

app.post('/', validateSchema(createPlayer), playerController.createPlayer);
app.put('/', validateSchema(updatePlayer), playerController.updatePlayer);
app.get('/', validateSchema(getPlayer), playerController.getPlayerByDocument);
app.get('/All', playerController.getPlayerList);

export default app;
