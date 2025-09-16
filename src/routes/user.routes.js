const express = require('express');
const auth = require('../middleware/authorizations'); 
const { createUser, login, verifyUser } = require('../controllers/user.controller.js');

const userRoutes = express.Router();

userRoutes.post('/create', createUser); // localhost:3000/api/users/create
userRoutes.post('/login', login); // localhost:3000/api/users/login
userRoutes.get('/verify-user', auth, verifyUser); // localhost:3000/api/users/verify-user

module.exports = userRoutes;
