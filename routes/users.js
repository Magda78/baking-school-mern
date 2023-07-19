const express = require('express');
const router = express.Router();
const Users = require('../controllers/users-controllers');
const { check } = require('express-validator');

router.get('/users', Users.getUsers);
router.post('/users/signUp',[ check('firstName').not().isEmpty(), check('lastName').not().isEmpty(),check('email').normalizeEmail().isEmail(),check('password').isLength({min:6}) ],Users.signUp)
router.post('/users/login',Users.login)
module.exports = router;
