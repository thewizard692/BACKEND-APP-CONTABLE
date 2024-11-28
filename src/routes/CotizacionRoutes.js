import express from 'express';
import {
  createCotizacion,
  updateCotizacion,
  deleteCotizacion,
  getAllCotizaciones,
  getCotizacionById,
  getCotizacionByCliente,
} from '../controllers/CotizacionController.js';

const router = express.Router();

router.post('/create', createCotizacion);
router.put('/update/:id', updateCotizacion);
router.delete('/delete/:id', deleteCotizacion);
router.get('/', getAllCotizaciones);
router.get('/:id', getCotizacionById);
router.get('/cliente/:cliente', getCotizacionByCliente);

export default router;
