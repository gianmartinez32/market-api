/* eslint-disable @typescript-eslint/naming-convention */
import { Database } from '@database';
import { inject, injectable } from 'inversify';
import { IVenta } from '@interface/IVenta';
import { ContainerValues } from '@interface/IContainers';
import { ventaQuery } from '@libraries/query/venta.query';

@injectable()
export class VentaDao {
  private DataBase: Database;

  constructor(@inject(ContainerValues.DATABASE) dataBase: Database) {
    this.DataBase = dataBase;
  }

  public createVenta = async (data: IVenta) => {
    const {
      cantidad_vendida, codigo_producto, nombre_cliente, telefono_cliente, total_venta,
    } = data;
    console.log('data', data);
    const result: Array<any> = await this.DataBase.query(ventaQuery.createVenta, [
      codigo_producto,
      nombre_cliente,
      telefono_cliente,
      cantidad_vendida,
      total_venta ]);
    return result;
  };

  public updateVenta = async (data: IVenta) => {
    const {
      cantidad_vendida, codigo_producto, nombre_cliente, telefono_cliente, total_venta, codigo,
    } = data;
    const result: Array<any> = await this.DataBase.query(ventaQuery.updateVenta, [ codigo_producto,
      nombre_cliente,
      telefono_cliente,
      cantidad_vendida,
      total_venta,
      codigo ]);
    return result;
  };

  public getVentaById = async (data: string) => {
    const [ result ]: Array<any> = await this.DataBase.query(ventaQuery.getVentaByCodigo, [ data ]);
    return result[0];
  };

  public getVentas = async () => {
    const result : Array<any> = await this.DataBase.query(ventaQuery.getVentaList);
    return result[0];
  };

  public deleteVenta = async (codigo:string) => {
    const result: Array<any> = await this.DataBase.query(ventaQuery.deleteVenta, [ codigo ]);
    return result;
  };
}
