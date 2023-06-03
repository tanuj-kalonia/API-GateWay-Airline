const express = require('express');

const { UserController } = require('../../controllers')
const { UserMiddleware } = require('../../middlewares');

const router = express.Router();

// create an airplane
router.post('/',
    UserMiddleware.validateCreateRequest,
    UserController.signup
)

module.exports = router;