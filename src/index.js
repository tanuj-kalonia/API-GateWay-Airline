const express = require('express');

const rateLimit = require('express-rate-limit')
const { ServerConfig, LoggerConfig } = require("./config");

const apiRoutes = require('./routes')
const app = express();

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 3
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Server running at Port : ${ServerConfig.PORT}`);

    // This will print the logs on the console.
    // LoggerConfig.info('Server is up here')
})
