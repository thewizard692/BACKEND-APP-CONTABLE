const { db } = require('../config/firebase');

// Crear una cuenta
const createAccount = async (userId, accountData) => {
  const accountRef = await db.collection('accounts').add({
    userId,
    ...accountData,
    createdAt: new Date().toISOString(),
  });
  return accountRef.id;
};
