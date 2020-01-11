const Booking = require('../Models/Booking')


module.exports = {
    async store(require, response){
        const { user_id } = require.headers;
        const { spot_id } = require.params;
        const { date } = require.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });
        await booking.populate('spot').populate('user').execPopulate();

        const ownerSocket = require.connectUsers[booking.spot.user];

        if(ownerSocket){
            require.io.to(ownerSocket).emit('booking_request',booking);
        }

        return response.json(booking);
    }
};