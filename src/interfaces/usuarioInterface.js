const { db } = require('../config/firebase');

// Crear un usuario
const createUser = async (userData) => {
  const userRef = await db.collection('users').add({
    ...userData,
    createdAt: new Date().toISOString(),
  });
  return userRef.id; // Retorna el ID generado
};
