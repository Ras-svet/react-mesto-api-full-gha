// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const CastError = require('../errors/cast-error');
const ConflictError = require('../errors/conflict-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => next(err));
};

module.exports.myInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Неккоретный id пользователя'));
      } else { next(err); }
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь по указанному id не найден'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Неккоретный id пользователя'));
      } else { next(err); }
    });
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name, about, avatar, email, password: hash,
    });
    res.status(201).send({
      _id: newUser._id,
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError('Пользователь c указанной почтой уже есть в системе'));
    } else if (err.name === 'ValidationError') {
      next(new ValidationError('Переданы некорректные данные при создании пользователя'));
    } else { next(err); }
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findbyCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res.status(200).send({ token });
    })
    .catch((err) => next(err));
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении профиля.'));
      } else { next(err); }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь по указанному id не найден'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при обновлении аватара'));
      } else { next(err); }
    });
};
