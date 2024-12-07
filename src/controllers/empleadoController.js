import EmpleadoService from '../services/empleadoService.js';
import { validationResult } from 'express-validator';

const empleadoService = new EmpleadoService(); // Usa minúsculas para la instancia

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array(),
    });
  }
  next();
};

const createEmpleado = async (req, res) => {
  //handleValidationErrors(req, res);
  console.log('@@@ body=>', req.body)
  try {
    // Agrega un console.log para ver qué se va a enviar a Firebase
    console.log('Datos a enviar a Firebase:', req.body);
    const empleadoId = await empleadoService.createEmpleado(req.body, req.file); // usa la instancia correcta
    res.status(201).json({
      message: true,
      empleadoId,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateEmpleado = async (req, res) => {
  //handleValidationErrors(req, res);
  try {
    const id = req.params.id;
    await empleadoService.updateEmpleado(id, req.body, req.file); // usa la instancia correcta
    res.status(201).json({
      message: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteEmpleado = async (req, res) => {
  try {
    const id = req.params.id;
    await empleadoService.deleteEmpleado(id); // Asegúrate de que el nombre del método sea correcto
    res.status(200).json({
      success: true,
      message: 'Empleado eliminado con éxito',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllEmpleados = async (req, res) => {
  try {
    const empleados = await empleadoService.getAllEmpleados(); // usa la instancia correcta
    res.status(201).json({
      message: true,
      empleados,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getEmpleadoById = async (req, res) => {
  //handleValidationErrors(req, res);
  try {
    const id = req.params.id;
    const empleado = await empleadoService.getEmpleadoById(id); // usa la instancia correcta
    if (!empleado) {
      return res.status(404).json({
        success: false,
        message: 'Empleado not Found',
      });
    }
    res.status(201).json({
      message: true,
      empleado,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getEmpleadoByUsername = async (req, res) => {
  //handleValidationErrors(req, res);
  try {
    const username = req.params.username;
    const empleado = await empleadoService.getEmpleadoByUsername(username); // usa la instancia correcta
    if (!empleado) {
      return res.status(404).json({
        success: false,
        message: 'Empleado not Found',
      });
    }
    res.status(201).json({
      message: true,
      empleado,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getEmpleadoByRol = async (req, res) => {
  //handleValidationErrors(req, res);
  try {
    const rol = req.params.rol;
    const empleado = await empleadoService.getEmpleadoByRol(rol); // usa la instancia correcta
    if (!empleado) {
      return res.status(404).json({
        success: false,
        message: 'Empleado not Found',
      });
    }
    res.status(201).json({
      message: true,
      empleado,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
  getAllEmpleados,
  getEmpleadoById,
  getEmpleadoByRol,
  getEmpleadoByUsername,
};
