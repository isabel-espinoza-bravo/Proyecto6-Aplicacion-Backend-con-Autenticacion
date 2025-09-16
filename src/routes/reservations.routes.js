const express = require('express');
const { getAllReservations, createReservation, getReservationById, updateReservationById, deleteReservationById } = require('../controllers/reservations.controller'); 

const reservationsRouter = express.Router();

// GET todas las reservas
reservationsRouter.get('/', getAllReservations); // localhost:3000/api/reservations/
// POST crear reserva
reservationsRouter.post('/', createReservation); // localhost:3000/api/reservations
// GET una reserva por ID
reservationsRouter.get('/readone/:id', getReservationById); // localhost:3000/api/reservations/readone/:id
// PUT actualizar reserva por id
reservationsRouter.put('/:id', updateReservationById); // localhost:3000/api/reservations/update/:id
// DELETE eliminar reserva por id
reservationsRouter.delete('/:id', deleteReservationById); // localhost:3000/api/reservations/delete/:id

module.exports = reservationsRouter;
