// Dentro do Controller vamos ter o CRUD
const User = require('../Models/User');

module.exports = {
    async store(require,response){
        const{ email } = require.body;
        
        let user =  await  User.findOne({ email });

        if(!user){
            const user = await User.create({ email });
        }

        return response.json(user);
    }
}