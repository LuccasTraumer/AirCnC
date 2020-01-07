// Externas
const express = require('express');
const multer = require('multer');

// Internas
const SessionController = require('./Controllers/SessionController');
const SpotController = require('./Controllers/SpotController');
const uploadConfig = require('./config/upload');
const DashboardController = require('./Controllers/DashboardController');
const bookingController = require('./Controllers/BookingController');

// Utilizadas
const routes = express.Router();
const upload = multer(uploadConfig);


routes.post('/spots',upload.single('thumbnail'),SpotController.store);
routes.post('/sessions',SessionController.store);
routes.get('/spots',SpotController.index);
routes.get('/dashboard',DashboardController.show);

routes.post('/spots/:spot_id/bookings',bookingController.store)

module.exports = routes;