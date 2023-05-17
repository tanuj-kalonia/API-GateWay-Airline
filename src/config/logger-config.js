// This is used to create log files 
// to keep track all the logs, which will be used to debug further

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

// logs will be printed in custome format
// time : info : message
const customFormat = printf(({ level, message, timestamp, error }) => {
    return `${timestamp} : ${level} ${message}`;
});


const logger = createLogger({
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        customFormat,
    ),
    transports: [
        new transports.Console(), // This will print the logs to the console
        new transports.File({ filename: 'combined.log' }) // Logs will also be stored in the file
    ],
});

module.exports = logger;