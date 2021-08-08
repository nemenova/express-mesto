const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
  .orFail(new Error('Error: not found'))
  .then((user) => {
    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
      return;
    }
    res.send(user);
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user.id, { name, about }, {new: true, runValidators: true})
  .then((user) => {
    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
      return;
    }
    res.send(user);
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user.id, { avatar }, {new: true, runValidators: true})
  .then((user) => {
    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
      return;
    }
    res.send(user);
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.name === 'CastError') {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
};