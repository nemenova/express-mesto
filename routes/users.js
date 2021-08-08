const router = require('express').Router();
const { getUsers, getUserById, createUser, updateProfile, updateAvatar } = require('../controllers/users');


router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;




// const User = require('../models/user');
// router.get('/users', (req, res) => {
//   User.find({})
//     .then(user => res.send({ data: user }))
//     .catch(err => res.status(500).send({ message: err.message  }));
// });


// router.get('/users/:userId', (req, res) => {
//   User.findById(req.params.id)
//     .then(user => res.send({ data: user }))
//     .catch(err => res.status(500).send({ message: err.message  }));
// });

// router.post('/users', (req, res) => {
//   const { name, about } = req.body;
//   User.create({ name, about })
//     // вернём записанные в базу данные
//     .then(user => res.send({ data: user }))
//     // данные не записались, вернём ошибку
//     .catch(err => res.status(500).send({ message: err.message }));
// });