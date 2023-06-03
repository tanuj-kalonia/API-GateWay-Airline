const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ServerConfig } = require('../../config')

function comparePassword(plainPassword, encryptedPassword) {
    try {
        return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch (error) {
        throw error
    }
}

function createToken(inputObj) {
    try {
        const token = jwt.sign(inputObj, ServerConfig.JWT_SECRET, { expiresIn: ServerConfig.JWT_EXPIRE });
        return token;
    } catch (error) {
        throw error;
    }
}

function verifyToken(token) {
    try {
        return jwt.verify(token, ServerConfig.JWT_SECRET);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    comparePassword,
    createToken,
    verifyToken
}