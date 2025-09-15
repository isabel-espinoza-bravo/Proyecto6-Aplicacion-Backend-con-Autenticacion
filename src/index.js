require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const User = require('./models/user');
const Reservations = require('./models/Reservations');

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware para JSON
app.use(express.json());

// Conectar a MongoDB
connectDB();

/* -------------------- Rutas de Reservations -------------------- */

// GET todas las reservas
app.get('/reservations', async (req, res) => {
    try {
        const reservations = await Reservations.find({});
        return res.status(200).json({ reservations });
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las reservas', error: error.message });
    }
});

// POST nueva reserva
app.post('/reservations', async (req, res) => {
    try {
        const { Titular, FechaInicio, FechaTermino, Destinations, CantidadPersonas, price, Estado } = req.body;

        const newReservation = await Reservations.create({
            Titular,
            FechaInicio: new Date(FechaInicio),
            FechaTermino: new Date(FechaTermino),
            Destinations,
            CantidadPersonas: Number(CantidadPersonas),
            price: Number(price),
            Estado
        });

        return res.status(200).json({ datos: newReservation });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear la reserva', error: error.message });
    }
});

/* -------------------- Rutas de Users -------------------- */

// GET todos los usuarios
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
});

// POST nuevo usuario
app.post('/users', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Validación primero
        if (!nombre || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Crear el usuario una sola vez
        const newUser = await User.create({ nombre, email, password });

        return res.status(201).json({ user: newUser });
    } catch (error) {
        console.error(" Error en POST /users:", error);
        return res.status(500).json({ message: "Error al crear usuario", error: error.message });
    }
});


/* -------------------- Iniciar servidor -------------------- */
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
