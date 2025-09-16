const User = require('../models/user'); // Ruta corregida
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario ya existe' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 8);

    // Crear usuario
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({ user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Error en login', error: error.message });
  }
};

// Verificar usuario
exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Error al verificar usuario', error: error.message });
  }
};
