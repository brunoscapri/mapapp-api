const express = require('express');
const router = express.Router();
const controller = require("../controllers/user-controller");
const auth = require("../services/auth-service");


router.get('/', auth.isAdmin, controller.get);
router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.post('/refreshtoken', auth.autorize, controller.refreshToken);


module.exports = router;