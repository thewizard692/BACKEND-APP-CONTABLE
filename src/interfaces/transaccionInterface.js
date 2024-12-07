const { db } = require('../config/firebase');

// Crear una transacción
const createTransaction = async (accountId, transactionData) => {
  const transactionRef = await db.collection('transactions').add({
    accountId,
    ...transactionData,
    createdAt: new Date().toISOString(),
  });
  return transactionRef.id;
};
