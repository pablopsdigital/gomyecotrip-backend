'use strict';

const express = require('express');
const router = express.Router();
const isAuth = require('../../../middlewares/auth');
const { isAdmin, isHosted, isHostedOrAdmin } = require('../../../middlewares/checkUserRole');
const authRateLimit = require('../../../middlewares/authRateLimit');

const {
  signUpUser,
  signInUser,
  getAllUsers,
  getOneUserForId,
  updateUserProfile,
  updateHostProfile,
  updateUser,
  deleteUser,
} = require('../../../controllers/userController.js');

router.get('/', isAuth, isAdmin, getAllUsers);
router.get('/:id', getOneUserForId);
router.post('/signin', authRateLimit, signInUser);
router.post('/signup', authRateLimit, signUpUser);
router.put('/update/profile/:id', isAuth, updateUserProfile);
router.put('/update/profile/host/:id', isAuth, updateHostProfile);
router.put('/update/:id', isAuth, isAdmin, updateUser);
router.delete('/delete/:id', isAuth, isAdmin, deleteUser);

module.exports = router;
