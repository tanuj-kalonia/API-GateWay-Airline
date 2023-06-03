const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

async function validateCreateRequest(req, res, next) {
    if (!req.body.email) {
        ErrorResponse.message = "Something went wrong while creating User";
        ErrorResponse.error = new AppError(["The parameter 'email' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res.json(ErrorResponse)
    }
    if (!req.body.password) {
        ErrorResponse.message = "Something went wrong while creating User";
        ErrorResponse.error = new AppError(["The parameter 'password' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res.json(ErrorResponse)
    }
    next();
}
async function validatAutheRequest(req, res, next) {
    if (!req.body.email) {
        ErrorResponse.message = "Something went wrong while authenticating User";
        ErrorResponse.error = new AppError(["The parameter 'email' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res.json(ErrorResponse)
    }
    if (!req.body.password) {
        ErrorResponse.message = "Something went wrong while authenticating User";
        ErrorResponse.error = new AppError(["The parameter 'password' is in wrong formate(or not passed), please ractify!!"], StatusCodes.BAD_REQUEST)
        return res.json(ErrorResponse)
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validatAutheRequest
}