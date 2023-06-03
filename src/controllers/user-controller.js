const { StatusCodes } = require('http-status-codes');
const { UserService } = require('../services');
const { ErrorResponse, SuccessResponse } = require('../utils/common');

// POST : /api/v1/signup
async function signup(req, res) {
    try {
        const { email, password } = req.body;

        const user = await UserService.createUser({ email, password });

        SuccessResponse.data = user;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse)

    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)   // from AppError
            .json(ErrorResponse)
    }
}


module.exports = {
    signup
}