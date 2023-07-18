const express = require('express');
const router = express.Router();
const Users = require('../controllers/users-controllers');

router.get('/users', Users.getUsers);
router.post('/users',Users.signUp)
module.exports = router;
