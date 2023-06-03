const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const { UserService } = require('../services')
const AppError = require('../utils/errors/app-error');

async function validateCreateRequest(req, res, next) {
    if (!req.body.email) {
        ErrorResponse.message = "Something went wrong while creating User";
        ErrorResponse.error = new AppError(["The parameter 'email' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.password) {
        ErrorResponse.message = "Something went wrong while creating User";
        ErrorResponse.error = new AppError(["The parameter 'password' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    next();
}
async function validatAutheRequest(req, res, next) {
    if (!req.body.email) {
        ErrorResponse.message = "Something went wrong while authenticating User";
        ErrorResponse.error = new AppError(["The parameter 'email' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    if (!req.body.password) {
        ErrorResponse.message = "Something went wrong while authenticating User";
        ErrorResponse.error = new AppError(["The parameter 'password' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse)
    }
    next();
}

async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        if (response) {
            req.user = response; // setting req.user = user.id
            next();
        }
    } catch (error) {
        console.log(error);
        return res
            .status(error.statusCode)
            .json(error)
    }
}

module.exports = {
    validateCreateRequest,
    validatAutheRequest,
    checkAuth
}