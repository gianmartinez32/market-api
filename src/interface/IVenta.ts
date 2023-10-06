export interface IVenta {
    codigo: number;
    codigo_producto: number;
    nombre_cliente: string;
    telefono_cliente: string;
    fecha_venta: Date;
    cantidad_vendida: number;
    total_venta: number;
}
