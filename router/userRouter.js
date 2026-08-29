const express = require('express');
const router = express.Router();
const {getUser, saveUser, updateUser, deleteUser, getDashboardData} = require('../controller/userController')

router.get('/', getUser);
router.post('/', saveUser);
router.put('/', updateUser);
router.delete('/', deleteUser);
router.get('/dashboard-data', getDashboardData);

module.exports = router;