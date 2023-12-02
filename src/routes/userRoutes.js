const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers);
router.post('/user', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
