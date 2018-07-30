var express = require('express');
var router = express.Router();
const Joi = require('joi');
const passport = require('passport');

var user_controller = require('../controllers/userController');



// default users

router.get('/', function(req, res) {
    res.send('NOT IMPLEMENTED: User detail: ');
});

// register API
router.post('/login',passport.authenticate('local'), user_controller.user_login);

// login API
router.post('/register',user_controller.user_register);

module.exports = router;
