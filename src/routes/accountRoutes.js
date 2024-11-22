const express = require('express');
const { createAccount, getAccounts } = require('../controllers/accountController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/', authMiddleware, createAccount);
router.get('/', authMiddleware, getAccounts);

module.exports = router;
