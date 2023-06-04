const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    BOOKING_SERVICE: process.env.BOOKING_SERVICE,
    FLIGHT_SERVICE: process.env.FLIGHT_SERVICE
}