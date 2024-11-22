import { db } from '../config/firebase.js';
import EmpleadoModel from '../models/EmpleadoModel.js';

class EmpleadoRepository {
  // Corregido: Evita declarar de nuevo la variable 'empleado' dentro del método
  async createEmpleado(data) {
    // Asegúrate de que no haya campos undefined
    const fields = ['nombre', 'direccion', 'telefono', 'usuario', 'password', 'apaterno', 'ciudad', 'rol', 'amaterno', 'estado'];
    for (const field of fields) {
      if (data[field] === undefined || data[field] === null) {
        throw new Error(`El campo ${field} es obligatorio.`);
      }
    }

    const empleadoRef = await db.collection('empleados').add({
      nombre: data.nombre,
      apaterno: data.apaterno,
      amaterno: data.amaterno,
      direccion: data.direccion,
      telefono: data.telefono,
      ciudad: data.ciudad,
      estado: data.estado || null,
      usuario: data.usuario,
      password: data.password,
      rol: data.rol || null,
      imagen: data.imagen || null, // Manejar imagen si no existe
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
          data.nombre,
          data.apaterno,
          data.amaterno,
          data.direccion,
          data.telefono,
          data.ciudad,
          data.estado,
          data.usuario,
          data.password,
          data.rol,
          data.imagen
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
      data.nombre,
      data.apaterno,
      data.amaterno,
      data.direccion,
      data.telefono,
      data.ciudad,
      data.estado,
      data.usuario,
      data.password,
      data.rol,
      data.imagen
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
      data.nombre,
      data.apaterno,
      data.amaterno,
      data.direccion,
      data.telefono,
      data.ciudad,
      data.estado,
      data.usuario,
      data.password,
      data.rol,
      data.imagen
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
          data.nombre,
          data.apaterno,
          data.amaterno,
          data.direccion,
          data.telefono,
          data.ciudad,
          data.estado,
          data.usuario,
          data.password,
          data.rol,
          data.imagen
        )
      );
    });
    return empleados;
  }
}

export default EmpleadoRepository;
