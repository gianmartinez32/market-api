export const productoQuery = {
  createProducto      : 'INSERT INTO shop.productos (nombre, descripcion, precio, cantidad_en_stock) VALUES(?, ?, ?, ?);',
  updateProducto      : 'UPDATE shop.productos SET nombre=?, descripcion=?, precio=?, cantidad_en_stock=? WHERE codigo=?;',
  getProductoByCodigo : 'SELECT * FROM shop.productos WHERE codigo=?',
  getProductoList     : 'SELECT * FROM shop.productos',
  deleteProduct       : 'DELETE FROM shop.productos WHERE codigo=?',
};
