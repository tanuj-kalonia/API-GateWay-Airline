const CrudRepository = require('./crud-repository');
const { Users } = require('../models')

class UserRepository extends CrudRepository {
    constructor() {
        super(Users)
    }
    async getUserByEmail(email) {
        const user = await Users.findOne({ where: { email: email } });
        return user;
    }
}

module.exports = UserRepository