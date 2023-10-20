import { Request, Response, Router } from 'express';
import PlayerRoutes from '@api/v1/player/player.route';
import ProductoRoute from '@api/v1/producto/producto.route';
import VentaRoute from '@api/v1/venta/venta.route';

const v1Router: Router = Router();

v1Router.use('/player', PlayerRoutes);
v1Router.use('/producto', ProductoRoute);
v1Router.use('/sales', VentaRoute);
v1Router.use((req, res, next) => {
  const error:any = new Error('Ruta no encontrada');
  error.status = 404;
  next(error);
});

v1Router.use((error:any, req:Request, res:Response, next:any) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

export default v1Router;
