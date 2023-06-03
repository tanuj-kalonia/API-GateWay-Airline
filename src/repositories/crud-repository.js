const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    // 1. create funtion
    // data -> object => {name, id, data,...}
    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    // 2. delete from table -> destoy
    async destroy(data) {

        const response = await this.model.destroy({
            where: { id: data } // delete from table where id = 'data'
        });
        if (!response) {
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response;

    }

    // 3. get from table
    // data -> primary key or id => pass the id, and get the user
    async get(data) {
        const response = await this.model.findByPk(data);
        if (!response) {
            throw new AppError('Not able to find the requested Data', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    // 4. get the entire table
    // select * from table
    async getAll() {
        const response = await this.model.findAll();  // return an array of all the tupples
        return response;
    }
    // 5. Update the table
    // Update the user data with the given data who have this id;
    async update(id, data) {
        if (JSON.stringify(data) === '{}') {
            throw new AppError('The input data is not a valid input', StatusCodes.BAD_REQUEST);
        }

        const response = await this.model.update(data, {
            where: { id: id }
        });  // return an array of all the tupples
        if (!response[0])
            throw new AppError('The resource to be updated not found', StatusCodes.NOT_FOUND);

        return response;


    }
}

module.exports = CrudRepository;
