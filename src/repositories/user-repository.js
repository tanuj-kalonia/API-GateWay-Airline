const CrudRepository = require('./crud-repository');
const { Users } = require('../models')

class UserRepository extends CrudRepository {
    constructor() {
        super(Users)
    }
}

module.exports = UserRepository