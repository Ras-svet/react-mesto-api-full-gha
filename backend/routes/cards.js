const { celebrate, Joi } = require('celebrate');
const cardRouter = require('express').Router();
const { URL_REGEXP } = require('../utils/constants');
const {
  getCards, createCard, deleteCardById, addLike, deleteLike,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_REGEXP),
  }),
}), createCard);
cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteCardById);
cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), addLike);
cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteLike);

module.exports = cardRouter;
