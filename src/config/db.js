const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI no está definido en .env');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

