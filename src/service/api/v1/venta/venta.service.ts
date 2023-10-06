import { inject, injectable } from 'inversify';
import { IVenta } from '@interface/IVenta';
import { VentaDao } from '@database/dao/venta.dao';
import { ContainerValues } from '@interface/IContainers';
import { ProductoDao } from '@database/dao/producto.dao';

@injectable()
export class VentaService {
  private ventaDao: VentaDao;

  private productoDao: ProductoDao;

  constructor(
@inject(ContainerValues.VENTA_DAO) ventaDao: VentaDao,
  @inject(ContainerValues.PRODUCTO_DAO) productoDao: ProductoDao,
  ) {
    this.ventaDao = ventaDao;
    this.productoDao = productoDao;
  }

  public createVenta = async (venta: IVenta) => {
    try {
      const { codigo_producto } = venta;
      const producto = await this.productoDao.getProductById(codigo_producto);
      console.log('pase por aca', producto);

      if (!producto) throw new Error('No existe el producto');
      const total_venta = venta.cantidad_vendida * producto.precio;
      const resutl = await this.ventaDao.createVenta({ ...venta, total_venta });
      return resutl;
    } catch (error) {
      return new Error('No existe el producto');
    }
  };

  public updateProdcuto = async (venta: IVenta) => {
    const resutl = await this.ventaDao.updateVenta(venta);
    return resutl;
  };

  public getventa = async (id: string) => {
    const resutl = await this.ventaDao.getVentaById(id);
    return resutl;
  };

  public getventas = async () => {
    const resutl = await this.ventaDao.getVentas();
    return resutl;
  };

  public deleteVenta = async (codigo:string) => {
    const resutl = await this.ventaDao.deleteVenta(codigo);
    return resutl;
  };
}
