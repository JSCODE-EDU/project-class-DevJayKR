import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // SERVER
  SERVER_PORT: Joi.number().required(),

  // MYSQL
  MYSQL_ROOT_USER: Joi.string().required(),
  MYSQL_ROOT_PASSWORD: Joi.string().required(),
  MYSQL_HOST: Joi.string().required(),
  MYSQL_PORT: Joi.number().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_DATABASE: Joi.string().required(),

  // JWT
  ACCESS_SECRET_KEY: Joi.string().required(),
  ACCESS_EXPIRE_TIME: Joi.string().required(),
});
