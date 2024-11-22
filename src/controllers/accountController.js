const { db } = require('../config/firebase');

const createAccount = async (req, res) => {
  try {
    const { name, balance } = req.body;

    const account = {
      userId: req.user.id,
      name,
      balance: balance || 0,
      createdAt: new Date().toISOString(),
    };

    const accountRef = await db.collection('accounts').add(account);

    res.status(201).json({ id: accountRef.id, ...account });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear cuenta', error });
  }
};

const getAccounts = async (req, res) => {
  try {
    const accountsSnapshot = await db.collection('accounts').where('userId', '==', req.user.id).get();

    const accounts = accountsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cuentas', error });
  }
};

module.exports = { createAccount, getAccounts };
