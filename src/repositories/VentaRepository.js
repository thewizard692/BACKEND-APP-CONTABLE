import { db } from '../config/firebase.js';
import VentaModel from '../models/VentaModel.js';

class VentaRepository {
  // Crear una nueva venta
  async createVenta(data) {
    const requiredFields = ['usuario', 'telefono', 'precio', 'idUsuario'];
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null) {
        throw new Error(`El campo ${field} es obligatorio.`);
      }
    }

    const ventaRef = await db.collection('ventas').add({
      name: data.usuario,
      telefono: data.telefono,
      observaciones: data.observaciones || null,
      precio: data.precio,
      idUsuario: data.idUsuario
    });

    return ventaRef.id;
  }

  // Actualizar una venta existente
  async updateVenta(id, data) {
    await db.collection('ventas').doc(id).update(data);
  }

  // Eliminar una venta
  async deleteVenta(id) {
    await db.collection('ventas').doc(id).delete();
  }

  // Obtener todas las ventas
  async getAllVentas() {
    const docs = await db.collection('ventas').get();
    const ventas = [];
    docs.forEach((doc) => {
      const data = doc.data();
      ventas.push(
        new VentaModel(
          doc.id,
          data.usuario,
          data.telefono,
          data.observaciones,
          data.precio,
          data.idUsuario
        )
      );
    });
    return ventas;
  }

  // Obtener una venta por su ID
  async getVentaById(id) {
    const doc = await db.collection('ventas').doc(id).get();

    if (!doc.exists) {
      return null;
    }

    const data = doc.data();
    return new VentaModel(
      doc.id,
      data.usuario,
      data.telefono,
      data.observaciones,
      data.precio,
      data.idUsuario
    );
  }
}

export default VentaRepository;
