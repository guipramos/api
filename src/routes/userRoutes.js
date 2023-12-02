const express = require('express');
const router = express.Router();
const verifyJWT = require('../createUser/verifyJWT');
const userController = require('../controllers/userController');

router.use(verifyJWT);
router.get('/users', userController.getAllUsers);
router.post('/user', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = router;
