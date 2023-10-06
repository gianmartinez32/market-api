import logger from '@util/logger';
import { inject, injectable } from 'inversify';
import { IProducto } from '@interface/IProducto';
import { ContainerValues } from '@interface/IContainers';
import { Request, RequestHandler, Response } from 'express';
import { ProductoService } from './producto.service';

@injectable()
export class ProductoController {
  private productoService: ProductoService;

  constructor(@inject(ContainerValues.PRODUCTO_SERVICE) productoService: ProductoService) {
    this.productoService = productoService;
  }

  public createProdcuto: RequestHandler = async (req: Request, res: Response) => {
    try {
      const data: IProducto = req.body;
      await this.productoService.createProdcuto(data);
      return res.status(200).json({ status: 200, message: 'Producto creado correctamente' });
    } catch (error) {
      logger.error('Error creating product', error);
      return res.status(500).json({ message: 'Error al crear el producto' });
    }
  };

  public updateProdcuto: RequestHandler = async (req: Request, res: Response) => {
    try {
      const data: IProducto = req.body;
      const { codigo } = req.params;
      await this.productoService.updateProdcuto({ ...data, codigo: Number(codigo) });
      return res.status(200).json({ status: 200, message: 'Producto editado correctamente' });
    } catch (error) {
      logger.error('Error editing producto', error);
      return res.status(500).json({ message: 'Error al actualizar el producto' });
    }
  };

  public getProductoByCodigo: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { codigo } = req.params;
      const response = await this.productoService.getProducto(Number(codigo));
      if (response) {
        return res.status(200).json({ status: 200, producto: response });
      }
      return res.status(200).json({ status: 200, message: 'Producto no encontrado', producto: [] });
    } catch (error) {
      logger.error('Error getting producto', error);
      return res.status(500).json({ message: 'Error al obtener el producto' });
    }
  };

  public getProductos: RequestHandler = async (req: Request, res: Response) => {
    try {
      const response = await this.productoService.getProductos();
      return res.status(200).json({ status: 200, message: 'Productos registrados en el sistema', productos: response[0] });
    } catch (error) {
      logger.error('Error creating producto', error);
      return res.status(500).json({ message: 'Error al obtener los productos' });
    }
  };

  public deleteProduct: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { codigo } = req.params;
      await this.productoService.deleteProduct(codigo);
      return res.status(200).json({ status: 200, message: `Producto ${codigo} eliminado` });
    } catch (error) {
      logger.error('Error creating producto', error);
      return res.status(500).json({ message: `Error al eliminar el producto ${req.params.codigo}` });
    }
  };
}
