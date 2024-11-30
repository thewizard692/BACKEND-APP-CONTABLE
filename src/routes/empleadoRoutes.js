import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { check } from 'express-validator'
import multer from 'multer'
import {
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
  getAllEmpleados,
  getEmpleadoById,
  getEmpleadoByRol,
  getEmpleadoByUsername
} from '../controllers/empleadoController.js'



const upload = multer ({ storage: multer.memoryStorage() })
const router = express.Router()

router.post(
  '/create',
  //aqui va el middleware
  upload.single('imagen'),
  [
    check('usuario').notEmpty().withMessage('El usuario es obligatorio'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña es de minimo 6 cracteres'),
  ],
  createEmpleado
)

router.put('/update/:id', upload.single('imagen'), updateEmpleado )
router.delete('/delete/:id', deleteEmpleado)
router.get('/', getAllEmpleados)
router.get('/empleado/:id', getEmpleadoById)
router.get('/rol/:rol', getEmpleadoByRol)
router.get('/usuario/:usuario', getEmpleadoByUsername)

export default router