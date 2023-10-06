export const ventaQuery = {
  createVenta      : 'INSERT INTO shop.ventas(codigo_producto, nombre_cliente, telefono_cliente, fecha_venta, cantidad_vendida, total_venta) VALUES(?, ?, ?, CURRENT_TIMESTAMP, ?, ?);',
  updateVenta      : 'UPDATE shop.ventas SET codigo_producto=?, nombre_cliente=?, telefono_cliente=?, cantidad_vendida=?, total_venta=? WHERE codigo=?;',
  getVentaByCodigo : 'SELECT * FROM shop.ventas WHERE codigo = ?',
  getVentaList     : 'SELECT * FROM shop.ventas',
  deleteVenta      : 'DELETE FROM shop.ventas WHERE codigo=?',
};
