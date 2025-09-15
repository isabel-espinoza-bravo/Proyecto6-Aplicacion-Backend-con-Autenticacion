const mongoose = require('mongoose');
const ReservationsSchema = new mongoose.Schema(

 {
    Titular: { type: String, required: true },
    FechaInicio: { type: Date, required: true },
    FechaTermino: { type: Date, required: true },
    Destinations: { type: String, required: true },
    CantidadPersonas: { type: Number, required: true },
    price: { type: Number, required: true },
    Estado: { type: String, enum: ['Pendiente', 'Confirmada', 'Cancelada'], default: 'Pendiente' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reservations', ReservationsSchema);
