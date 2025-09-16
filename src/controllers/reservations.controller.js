const Reservations = require('../models/reservations.js');

// Obtener todas las reservas
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservations.find({});
    return res.status(200).json({ reservations });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al obtener las reservas', error: error.message });
  }
};

// Crear una reserva
exports.createReservation = async (req, res) => {
  try {
    const { Titular, FechaInicio, FechaTermino, Destino, CantidadPersonas, Precio, Estado } = req.body;

    const newReservation = await Reservations.create({
      Titular,
      FechaInicio: new Date(FechaInicio),
      FechaTermino: new Date(FechaTermino),
      Destino,
      CantidadPersonas: Number(CantidadPersonas),
      Precio: Number(Precio),
      Estado
    });

    return res.status(200).json({ datos: newReservation });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al crear la reserva', error: error.message });
  }
};

// Obtener una reserva por ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservations.findById(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    return res.status(200).json({ reservation });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener la reserva', error: error.message });
  }
};

// Actualizar una reserva por ID
exports.updateReservationById = async (req, res) => {
  try {
    const { Titular, FechaInicio, FechaTermino, Destinations, CantidadPersonas, price, Estado } = req.body;

    const updatedReservation = await Reservations.findByIdAndUpdate(
      req.params.id,
      { Titular, FechaInicio, FechaTermino, Destinations, CantidadPersonas, price, Estado },
      { new: true, runValidators: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    return res.status(200).json({ reservationActualizada: updatedReservation });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al actualizar la reserva', error: error.message });
  }
};

// Eliminar una reserva por ID
exports.deleteReservationById = async (req, res) => {
  try {
    const deletedReservation = await Reservations.findByIdAndDelete(req.params.id);

    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    return res.status(200).json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error al eliminar la reserva', error: error.message });
  }
};
