const express = require('express');

const { AuthMiddleware } = require('../../middlewares')
const { InfoController } = require('../../controllers')
const userRouter = require('./user-routes')
const router = express.Router();

router.get('/info', AuthMiddleware.checkAuth, InfoController.info)
router.use('/user', userRouter);

module.exports = router;