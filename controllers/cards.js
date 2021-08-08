const Card = require('../models/user');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(users => res.send({ data: users }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { owner } = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove({  })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports.dislikeCard = (req, res) => {
Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
.then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
}