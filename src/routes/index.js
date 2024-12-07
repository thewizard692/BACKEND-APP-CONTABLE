import { Router } from 'express'
import empleadosRoutes from './empleadoRoutes.js'
import authRoutes from './authRoutes.js'
import cotizacionRoutes from './CotizacionRoutes.js'
import ventaRoutes from './ventaRoutes.js'

const router = Router()

//app necesito una ruta base 
router.use('/empleados', empleadosRoutes)
router.use('/auth', authRoutes)
router.use('/cotizaciones', cotizacionRoutes);
router.use('/ventas', ventaRoutes);

export default router