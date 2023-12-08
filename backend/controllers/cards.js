const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const CastError = require('../errors/cast-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании карточки'));
      } else { next(err); }
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка по указанному id не найдена'));
      }
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Нет прав для удаления этой карточки'));
      }
      return Card.deleteOne(card).then(() => res.status(200).send({ message: `Карточка ${card} удалена` }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректный id карточки'));
      } else { next(err); }
    });
};

module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка по указанному id не найдена'));
      }
      return res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы некорректные данные для постановки лайка'));
      } else { next(err); }
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка по указанному id не найдена'));
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные для постановки/снятии лайка'));
      } else { next(err); }
    });
};
