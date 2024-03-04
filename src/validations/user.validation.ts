import Joi from 'joi';
import password from './custom.validation';
import objectId from './custom.validation';

const createUser = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    username: Joi.string(),
    role: Joi.string(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      username: Joi.string(),
      password: Joi.string(),
      role: Joi.string()
    })
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};