require('dotenv').config();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const connectDB = require('./config/db');

const User = require('./models/user');
const Reservations = require('./models/Reservations');
const auth = require('./middleware/authorizations');

const PORT = process.env.PORT || 3000;

const app = express();
// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


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

// PUT actualizar estado de reserva
app.put('/reservations/:id', async (req, res) => {
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
        return res.status(200).json({ reservationActualiza: updatedReservation });
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la reserva', error: error.message });   
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

// POST Crear nuevo usuario con password hasheada // inicio de sesión
app.post('/users/create', async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        let foundUser = await User.findOne({ email });
        if (foundUser) return res.status(400).json({ message: "Usuario ya existe" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const response = await User.create({ nombre, email, password: hashedPassword });
        if (newUser) return res.status(400).json({ message: "Usuario ya existe" });
        return res.status(201).json({ datos: newUser });
    } catch (error) {   
        return res.status(500).json({ message: "Error al crear usuario", error: error.message });
    }
});

app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(400).json({ message: "Credenciales inválidas" });
        const correctPassword = await bcrypt.compare(password, foundUser.password);
        if (!correctPassword) return res.status(400).json({ message: "Credenciales inválidas" });
        const payload = { id: foundUser._id, nombre: foundUser.nombre };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
    }


/* -------------------- Iniciar servidor -------------------- */
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
})});


app.get('users/verify', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json({usuario: user});
    } catch (error) {
        res.status(500).json 
    }
}) 