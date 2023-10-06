/* eslint-disable @typescript-eslint/naming-convention */
import { Database } from '@database';
import { inject, injectable } from 'inversify';
import { IProducto } from '@interface/IProducto';
import { ContainerValues } from '@interface/IContainers';
import { productoQuery } from '@libraries/query/producto.query';

@injectable()
export class ProductoDao {
  private DataBase: Database;

  constructor(@inject(ContainerValues.DATABASE) dataBase: Database) {
    this.DataBase = dataBase;
  }

  public createProducto = async (data: IProducto) => {
    const {
      nombre, descripcion, precio, cantidad_en_stock,
    } = data;
    const result: Array<any> = await this.DataBase.query(productoQuery.createProducto, [ nombre, descripcion, precio, cantidad_en_stock ]);
    return result;
  };

  public updateProducto = async (data: IProducto) => {
    const {
      nombre, descripcion, precio, cantidad_en_stock, codigo,
    } = data;
    const result: Array<any> = await this.DataBase.query(productoQuery.updateProducto, [ nombre, descripcion, precio, cantidad_en_stock, codigo ]);
    return result;
  };

  public getProductById = async (data: number) => {
    const [ result ]: Array<any> = await this.DataBase.query(productoQuery.getProductoByCodigo, [ data ]);
    return result[0];
  };

  public getProducts = async () => {
    const result: Array<any> = await this.DataBase.query(productoQuery.getProductoList);
    return result;
  };

  public deleteProduct = async (codigo:string) => {
    const result: Array<any> = await this.DataBase.query(productoQuery.deleteProduct, [ codigo ]);
    return result;
  };
}
