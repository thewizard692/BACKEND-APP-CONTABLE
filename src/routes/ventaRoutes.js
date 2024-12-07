import express from 'express';
import { check } from 'express-validator';
import {
  createVenta,
  updateVenta,
  deleteVenta,
  getAllVentas,
  getVentaById,
} from '../controllers/VentaController.js';

const router = express.Router();

router.post(
  '/create',
  [
    check('usuario').notEmpty().withMessage('El usuario es obligatorio'),
    check('telefono').notEmpty().withMessage('El teléfono es obligatorio'),
    check('precio').isNumeric().withMessage('El precio debe ser numérico'),
  ],
  createVenta
);

router.put('/update/:id', updateVenta);
router.delete('/delete/:id', deleteVenta);
router.get('/', getAllVentas);
router.get('/:id', getVentaById);

export default router;
