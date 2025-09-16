require('dotenv').config();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const connectDB = require('./config/db');

const User = require('./models/user');
const reservationsRouter = require('./routes/reservations.routes'); // Nombre correcto

const PORT = process.env.PORT || 3000;

const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', require('./routes/user.routes')); // Localhost:3000/api/users
app.use('/api/reservations', reservationsRouter); // Localhost:3000/api/reservations

/* -------------------- Iniciar servidor -------------------- */
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});

