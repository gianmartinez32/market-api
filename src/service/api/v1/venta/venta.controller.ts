import logger from '@util/logger';
import { inject, injectable } from 'inversify';
import { IVenta } from '@interface/IVenta';
import { ContainerValues } from '@interface/IContainers';
import { Request, RequestHandler, Response } from 'express';
import { VentaService } from './venta.service';

@injectable()
export class VentaController {
  private ventaService: VentaService;

  constructor(@inject(ContainerValues.VENTA_SERVICE) ventaService: VentaService) {
    this.ventaService = ventaService;
  }

  public createVenta: RequestHandler = async (req: Request, res: Response) => {
    try {
      const data: IVenta = req.body;
      const ress = await this.ventaService.createVenta(data);
      if (ress.toString().includes('Error')) {
        return res.status(400).json({ status: 400, message: 'Producto no existe' });
      }
      return res.status(200).json({ status: 200, message: 'Venta creada exitosamente' });
    } catch (error) {
      logger.error('Error creating sell', error);
      return res.status(500).json({ message: 'Error al crear la venta' });
    }
  };

  public updateVenta: RequestHandler = async (req: Request, res: Response) => {
    try {
      const data: IVenta = req.body;
      const { codigo } = req.params;
      await this.ventaService.updateProdcuto({ ...data, codigo: Number(codigo) });
      return res.status(200).json({ status: 200, message: 'venta editada correctamente' });
    } catch (error) {
      logger.error('Error editing sell', error);
      return res.status(500).json({ message: 'Error al editar la venta' });
    }
  };

  public getVentaByCodigo: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { codigo } = req.params;
      const venta = await this.ventaService.getventa(codigo);
      if (!venta) return res.status(200).json({ status: 200, message: 'Venta no encontrada' });
      return res.status(200).json({ status: 200, venta });
    } catch (error) {
      logger.error('Error creating sell', error);
      return res.status(500).json({ message: 'Error al obtener venta' });
    }
  };

  public getVentas: RequestHandler = async (req: Request, res: Response) => {
    try {
      const ventas = await this.ventaService.getventas();
      return res.status(200).json({ status: 200, message: 'ventas registradas', ventas });
    } catch (error) {
      logger.error('Error creating player', error);
      return res.status(500).json({ message: 'Error creating player' });
    }
  };

  public deleteVenta: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { codigo } = req.params;
      await this.ventaService.deleteVenta(codigo);
      return res.status(200).json({ status: 200, message: 'venta eliminado' });
    } catch (error) {
      logger.error('Error creating player', error);
      return res.status(500).json({ message: 'Error creating player' });
    }
  };
}
