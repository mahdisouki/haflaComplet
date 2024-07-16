const express = require('express');
const userCtrl = require('../controllers/UserCtrl');
const router = express.Router();

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.post('/users', userCtrl.createUser);
router.get('/users', userCtrl.getUsers);
router.get('/users/:id', userCtrl.getUser);
router.patch('/users/:id', userCtrl.updateUser);
router.delete('/users/:id', userCtrl.deleteUser);

module.exports = router;