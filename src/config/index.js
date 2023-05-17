const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    ServerConfig: require('./server-config'),
    LoggerConfig: require('./logger-config')
}