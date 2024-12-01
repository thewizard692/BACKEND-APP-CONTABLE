class VentaModel {
  constructor(id, usuario, telefono, observaciones, precio, idUsuario) {
    this.id = id; // ID de la venta
    this.usuario = usuario; // Nombre del cliente
    this.telefono = telefono; // Teléfono del cliente
    this.observaciones = observaciones || 'Sin observaciones'; // Observaciones (opcional)
    this.precio = precio; // Precio total de la venta
    this.idUsuario = idUsuario;
  }
}

export default VentaModel;
