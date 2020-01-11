// Externas


// Internas
const Booking = require('../Models/Booking')

//
module.exports = {
    async store(require,response){

        const { booking_id } = require.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = true;

        await booking.save();
        return response.json(booking);
    }
}