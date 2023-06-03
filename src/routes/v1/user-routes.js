const express = require('express');

const { UserController } = require('../../controllers')
const { AuthMiddleware } = require('../../middlewares');

const router = express.Router();

// create an user
router.post('/signup',
    AuthMiddleware.validateCreateRequest,
    UserController.signup
)

router.post('/signin',
    AuthMiddleware.validatAutheRequest,
    UserController.signin
)

module.exports = router;