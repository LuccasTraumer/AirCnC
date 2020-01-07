const Spot = require('../Models/Spot')
const User = require('../Models/User')
module.exports = {

    async index(require,response){
        const { tech } = require.query;

        const spots = await Spot.find({techs : tech });

        return response.json(spots);
    },

    async store(require,response){
        const { filename} = require.file;
        const {company, techs,price} = require.body;
        const {user_id} = require.headers;

        const user = await User.findById(user_id)

        if(!user){
            return response.status(400).json({error: 'User does exist'})
        }
        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        })

        return response.json(spot)
    }
};