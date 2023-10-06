import { Router } from 'express';
import container from '@container';
import { validateSchema } from '@libraries/middlewares/validate-schema.middlewares';
import { ProductoController } from './producto.controllers';
import { createProducto, getProduct, updateProducto } from './producto.schema';

const app: Router = Router();
const productoController = container.get<ProductoController>(ProductoController);

app.post('/', validateSchema(createProducto), productoController.createProdcuto);
app.patch('/:codigo', validateSchema(updateProducto), productoController.updateProdcuto);
app.get('/:codigo', validateSchema(getProduct), productoController.getProductoByCodigo);
app.delete('/:codigo', validateSchema(getProduct), productoController.deleteProduct);
app.get('/', productoController.getProductos);

export default app;
