const router = require('express').Router();
const {
  getUsers, getUserById, getUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
// router.post('/', createUser);
router.get('/me', getUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
