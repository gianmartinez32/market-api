import { Router } from 'express';
import PlayerRoutes from '@api/v1/player/player.route';
import ProductoRoute from '@api/v1/producto/producto.route';
import VentaRoute from '@api/v1/venta/venta.route';

const v1Router: Router = Router();

v1Router.use('/player', PlayerRoutes);
v1Router.use('/producto', ProductoRoute);
v1Router.use('/sales', VentaRoute);

export default v1Router;
