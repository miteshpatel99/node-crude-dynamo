module.exports = (app) => {
    const bookings = require('../controllers/booking.controller');

    // Create a new User
    app.post('/bookings', bookings.create);

    // Retrieve all User
    app.get('/bookings', bookings.findAll);

    // Retrieve a single user with userId
    app.get('/bookings/:bookingId', bookings.findOne);

    // Update a User with userId
    app.put('/bookings/:bookingId', bookings.update);

    // Delete a User with userId
    app.delete('/bookings/:bookingId', bookings.delete);
}