class CotizacionModel {
  constructor(id, numero, cliente, creacion, vencimiento, estado, total, referencia, descripcion, cantidad, nota) {
    this.id = id;
    this.numero = numero;
    this.cliente = cliente;
    this.creacion = creacion;
    this.referencia = referencia;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.nota = nota;
    this.vencimiento = vencimiento
    this.estado = estado;
    this.total = total;
  }
}

export default CotizacionModel;
