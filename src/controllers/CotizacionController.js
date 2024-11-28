import CotizacionRepository from '../repositories/CotizacionRepository.js';

const cotizacionRepository = new CotizacionRepository();

const createCotizacion = async (req, res) => {
  try {
    const cotizacionId = await cotizacionRepository.createCotizacion(req.body);
    res.status(201).json({
      success: true,
      cotizacionId,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCotizacion = async (req, res) => {
  try {
    const id = req.params.id;
    await cotizacionRepository.updateCotizacion(id, req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteCotizacion = async (req, res) => {
  try {
    const id = req.params.id;
    await cotizacionRepository.deleteCotizacion(id);
    res.status(200).json({ success: true, message: 'Cotización eliminada' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllCotizaciones = async (req, res) => {
  try {
    const cotizaciones = await cotizacionRepository.getAllCotizaciones();
    res.status(200).json({ success: true, cotizaciones });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getCotizacionById = async (req, res) => {
  try {
    const id = req.params.id;
    const cotizacion = await cotizacionRepository.getCotizacionById(id);
    if (!cotizacion) {
      return res.status(404).json({ success: false, message: 'No encontrada' });
    }
    res.status(200).json({ success: true, cotizacion });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getCotizacionByCliente = async (req, res) => {
  try {
    const cliente = req.params.cliente;
    const cotizacion = await cotizacionRepository.getCotizacionByCliente(cliente);
    if (!cotizacion) {
      return res.status(404).json({ success: false, message: 'No encontrada' });
    }
    res.status(200).json({ success: true, cotizacion });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export {
  createCotizacion,
  updateCotizacion,
  deleteCotizacion,
  getAllCotizaciones,
  getCotizacionById,
  getCotizacionByCliente,
};
