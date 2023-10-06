import { inject, injectable } from 'inversify';
import { IProducto } from '@interface/IProducto';
import { ProductoDao } from '@database/dao/producto.dao';
import { ContainerValues } from '@interface/IContainers';

@injectable()
export class ProductoService {
  private productoDao: ProductoDao;

  constructor(@inject(ContainerValues.PRODUCTO_DAO) productoDao: ProductoDao) {
    this.productoDao = productoDao;
  }

  public createProdcuto = async (producto: IProducto) => {
    const resutl = await this.productoDao.createProducto(producto);
    return resutl;
  };

  public updateProdcuto = async (producto: IProducto) => {
    const resutl = await this.productoDao.updateProducto(producto);
    return resutl;
  };

  public getProducto = async (id: number) => {
    const resutl = await this.productoDao.getProductById(id);
    return resutl;
  };

  public getProductos = async () => {
    const resutl = await this.productoDao.getProducts();
    return resutl;
  };

  public deleteProduct = async (codigo:string) => {
    const resutl = await this.productoDao.deleteProduct(codigo);
    return resutl;
  };
}
