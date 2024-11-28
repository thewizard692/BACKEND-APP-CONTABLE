import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import EmpleadoRepository from '../repositories/empleadoRepository.js';

const empleadoRepository = new EmpleadoRepository();

export const login = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const user = await empleadoRepository.getEmpleadoByUsername(usuario);
    if (!user) {
      return res.status(401).json({
        error: true,
        message: 'Usuario no existe'
      });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        error: true,
        message: 'La contraseña es incorrecta'
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (error) {
    // Agregar return aquí para evitar otro intento de respuesta
    return res.status(500).json({
      error: true,
      message: 'Error:' + error.message
    });
  }
};

export const logout = (req, res) => {
  res.json({
    error: false,
    message: 'Sesión cerrada con éxito'
  });
};

export const getUser = async (req, res) => {
  try {
    const userId = req.user.userId
    const user = await empleadoRepository.getEmpleadoById
    (userId)

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado'})
    }
    const { password, ...userWithoutPassword } = user
    res.json(userWithoutPassword)
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Error al obtener Usuario'})
  }
}

