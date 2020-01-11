// Externas


// Internas
const Booking = require('../Models/Booking')

//
module.exports = {
    async store(require,response){

        const { booking_id } = require.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = false;

        await booking.save();

        const bookingUserSocket = require.connectUsers[booking.user];

        if(bookingUserSocket){
            require.io.to(bookingUserSocket).emit('booking_response',booking);
        }

        return response.json(booking);
    }
}