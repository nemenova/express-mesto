const Card = require('../models/card');
const ERROR_CODE = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 400;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Нет такой карточки' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    })
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  console.log(req.body)
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then(card => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else if (err.name === 'Error') {
        res.status(NOT_FOUND).send({ message: 'Не удалось создать карточку' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    })
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove({ cardId })
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Нет такой карточки' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    })
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Нет такой карточки' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    })
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Нет такой карточки' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    })
}