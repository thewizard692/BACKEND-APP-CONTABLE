import { db } from '../config/firebase.js';
import EmpleadoModel from '../models/EmpleadoModel.js';

class EmpleadoRepository {
  // Corregido: Evita declarar de nuevo la variable 'empleado' dentro del método
  async createEmpleado(data) {
    // Asegúrate de que no haya campos undefined
    const fields = ['usuario','telefono', 'password', 'observaciones'];
    for (const field of fields) {
      if (data[field] === undefined || data[field] === null) {
        throw new Error(`El campo ${field} es obligatorio.`);
      }
    }

    const empleadoRef = await db.collection('empleados').add({
      usuario: data.usuario,
      usuario: data.usuario,
      telefono: data.telefono,
      password: data.password,
      observaciones: data.observaciones || null
    });
  
    return empleadoRef.id;
  }

  async updateEmpleado(id, data) {
    await db.collection('empleados').doc(id).update(data);
  }

  async deleteEmpleado(id) {
    await db.collection('empleados').doc(id).delete();
  }

  async getAllEmpleados() {
    const docs = await db.collection('empleados').get();
    const empleados = [];
    docs.forEach((doc) => {
      const data = doc.data();
      empleados.push(
        new EmpleadoModel(
          doc.id,
          data.usuario,
          data.telefono,
          data.password,
          data.observaciones
        )
      );
    });
    return empleados;
  }

  async getEmpleadoById(id) {
    const doc = await db.collection('empleados').doc(id).get();

    if (!doc.exists) {
      return null;
    }

    const data = doc.data();
    return new EmpleadoModel(
      doc.id,
      data.usuario,
      data.telefono,
      data.password,
      data.observaciones
    );
  }

  async getEmpleadoByUsername(usuario) {
    const empleadoSnapshot = await db
      .collection('empleados') // Corregido: 'collection' en lugar de 'colection'
      .where('usuario', '==', usuario)
      .get();

    if (empleadoSnapshot.empty) {
      return null;
    }
    console.log("¿Empleado encontrado?:", !empleadoSnapshot.empty); // Log para ver si encuentra coincidencias

    const doc = empleadoSnapshot.docs[0];
    const data = doc.data();
    return new EmpleadoModel(
      doc.id,
      data.usuario,
      data.telefono,
      data.password,
      data.observaciones
    );
  }

  async getEmpleadoByRol(rol) {
    const docs = await db.collection('empleados').where('rol', '==', rol).get();
    const empleados = [];
    docs.forEach((doc) => {
      const data = doc.data();
      empleados.push(
        new EmpleadoModel(
          doc.id,
          data.usuario,
          data.telefono,
          data.password,
          data.observaciones
        )
      );
    });
    return empleados;
  }
}

export default EmpleadoRepository;
