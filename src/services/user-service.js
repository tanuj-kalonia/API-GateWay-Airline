const { StatusCodes } = require('http-status-codes')
const { UserRepository } = require('../repositories')
const AppError = require('../utils/errors/app-error')
const { Auth } = require('../utils/common')

const userRepository = new UserRepository();

async function createUser(data) {
    try {
        const user = await userRepository.create(data);
        return user;

    } catch (error) {
        if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cant create new user Object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data) {
    try {
        const user = await userRepository.getUserByEmail(data.email);
        if (!user) {
            throw new AppError('No user found for the given mail', StatusCodes.NOT_FOUND);
        }

        const passwordMatch = Auth.comparePassword(data.password, user.password);
        if (!passwordMatch) {
            throw new AppError('Invalid emial or password', StatusCodes.BAD_REQUEST);
        }

        const inputObj = { id: user.id, email: user.email };
        const jwt = Auth.createToken(inputObj);

        return jwt;

    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        console.log(error);
        throw new AppError('Someting went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAuthenticated(token) {
    try {
        if (!token) {
            throw new AppError('Missing JWT Token', StatusCodes.BAD_REQUEST);
        }

        const response = Auth.verifyToken(token);
        const user = await userRepository.getUserByEmail(response.email);
        if (!user) {
            throw new AppError('No user found for the given mail', StatusCodes.NOT_FOUND);
        }

        return user.id;

    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        if (error.name == 'TokenExpiredError') {
            throw new AppError('JWT token expired', StatusCodes.BAD_REQUEST);
        }
        if (error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT Token', StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw new AppError('Someting went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }

}
module.exports = {
    createUser,
    signin,
    isAuthenticated
}