import { Router } from 'express';
import container from '@container';
import { validateSchema } from '@libraries/middlewares/validate-schema.middlewares';
import { VentaController } from './venta.controller';
import { createVenta, getVenta, updateVenta } from './venta.schema';

const app: Router = Router();
const ventaController = container.get<VentaController>(VentaController);

app.post('/', validateSchema(createVenta), ventaController.createVenta);
app.patch('/:codigo', validateSchema(updateVenta), ventaController.updateVenta);
app.get('/:codigo', validateSchema(getVenta), ventaController.getVentaByCodigo);
app.delete('/:codigo', validateSchema(getVenta), ventaController.deleteVenta);
app.get('/', ventaController.getVentas);

export default app;
