import VentaRepository from '../repositories/VentaRepository.js';
import { validationResult } from 'express-validator';

const ventaRepository = new VentaRepository();

const createVenta = async (req, res) => {
  try {
    const ventaId = await ventaRepository.createVenta(req.body);
    res.status(201).json({
      message: 'Venta creada con éxito',
      ventaId,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVenta = async (req, res) => {
  try {
    const id = req.params.id;
    await ventaRepository.updateVenta(id, req.body);
    res.status(200).json({
      message: 'Venta actualizada con éxito',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteVenta = async (req, res) => {
  try {
    const id = req.params.id;
    await ventaRepository.deleteVenta(id);
    res.status(200).json({
      success: true,
      message: 'Venta eliminada con éxito',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllVentas = async (req, res) => {
  try {
    const ventas = await ventaRepository.getAllVentas();
    res.status(200).json({
      success: true,
      ventas,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getVentaById = async (req, res) => {
  try {
    const id = req.params.id;
    const venta = await ventaRepository.getVentaById(id);
    if (!venta) {
      return res.status(404).json({
        success: false,
        message: 'Venta no encontrada',
      });
    }
    res.status(200).json({
      success: true,
      venta,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { createVenta, updateVenta, deleteVenta, getAllVentas, getVentaById };
