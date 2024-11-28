import { Router } from 'express'
import { login, logout, getUser } from '../controllers/authControler.js'
import { check } from 'express-validator'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

router.post(
  '/login',
  [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty()
  ],
  login
)

router.post('/logout', logout)
router.get('/user', authMiddleware, getUser)

export default router