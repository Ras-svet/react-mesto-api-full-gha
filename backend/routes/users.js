const { celebrate, Joi } = require('celebrate');

const userRouter = require('express').Router();
const {
  getUsers, myInfo, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');
const { URL_REGEXP } = require('../utils/constants');

userRouter.get('/', getUsers);
userRouter.get('/me', myInfo);
userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserById);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(URL_REGEXP),
  }),
}), updateAvatar);

module.exports = userRouter;
