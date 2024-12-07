import { db } from '../config/firebase.js';
import CotizacionModel from '../models/CotizacionModel.js';

class CotizacionRepository {
  async createCotizacion(data) {
    const fields = ['numero', 'cliente', 'creacion', 'vencimiento', 'estado', 'total', 'referencia', 'descripcion', 'nota', 'cantidad'];
    for (const field of fields) {
      if (data[field] === undefined || data[field] === null) {
        throw new Error(`El campo ${field} es obligatorio.`);
      }
    }

    const cotizacionRef = await db.collection('cotizaciones').add({
      numero: data.numero,
      cliente: data.cliente,
      creacion: data.creacion,
      vencimiento: data.vencimiento,
      estado: data.estado,
      total: data.total,
      referencia: data.referencia,
      descripcion: data.descripcion,
      nota: data.nota,
      cantidad: data.cantidad
    });

    return cotizacionRef.id;
  }

  async updateCotizacion(id, data) {
    await db.collection('cotizaciones').doc(id).update(data);
  }

  async deleteCotizacion(id) {
    await db.collection('cotizaciones').doc(id).delete();
  }

  async getAllCotizaciones() {
    const docs = await db.collection('cotizaciones').get();
    const cotizaciones = [];
    docs.forEach((doc) => {
      const data = doc.data();
      cotizaciones.push(
        new CotizacionModel(
          doc.id,
          data.numero,
          data.cliente,
          data.creacion,
          data.vencimiento,
          data.estado,
          data.total,
          data.referencia,
          data.descripcion,
          data.nota,
          data.cantidad
        )
      );
    });
    return cotizaciones;
  }

  async getCotizacionById(id) {
    const doc = await db.collection('cotizaciones').doc(id).get();

    if (!doc.exists) {
      return null;
    }

    const data = doc.data();
    return new CotizacionModel(
      doc.id,
      data.numero,
      data.cliente,
      data.creacion,
      data.vencimiento,
      data.estado,
      data.total,
      data.referencia,
      data.descripcion,
      data.nota,
      data.cantidad
    );
  }

  async getCotizacionByCliente(cliente) {
    const cotizacionSnapshot = await db
      .collection('cotizaciones')
      .where('cliente', '==', cliente)
      .get();

    if (cotizacionSnapshot.empty) {
      return null;
    }

    const doc = cotizacionSnapshot.docs[0];
    const data = doc.data();
    return new CotizacionModel(
      doc.id,
      data.numero,
      data.cliente,
      data.creacion,
      data.vencimiento,
      data.estado,
      data.total,
      data.referencia,
      data.descripcion,
      data.nota,
      data.cantidad
    );
  }
}

export default CotizacionRepository;
