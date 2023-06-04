const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')
const rateLimit = require('express-rate-limit')
const { ServerConfig, LoggerConfig } = require("./config");

const apiRoutes = require('./routes')
const app = express();

const limiter = rateLimit({ // rate limiter -> avoids request attack on the services
    windowMs: 2 * 60 * 1000,
    max: 10
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

/**
 * Backward proxy for diffrent services
 * All the Requests will be routed to corrosponding requests
 */
app.use('/flightsService', createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true,
    pathRewrite: { '/flightsService': '/' }
}))
app.use('/bookingService', createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE,
    changeOrigin: true,
    pathRewrite: { '/bookingService': '/' }
}))

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Server running at Port : ${ServerConfig.PORT}`);

    // This will print the logs on the console.
    // LoggerConfig.info('Server is up here')
})
