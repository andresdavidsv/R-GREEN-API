const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userFirstNameSchema = joi.string().min(5).max(15);
const userLastNameSchema = joi.string().min(5).max(15);
const userUserNameSchema = joi.string().min(3).max(10);
const userEmailSchema = joi.string().email();
const userPasswordSchema = joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);
const userAdminSchema = joi.boolean();

const createUserSchema = {
  first_name: userFirstNameSchema.required(),
  last_name: userLastNameSchema.required(),
  user_name: userUserNameSchema.required(),
  email: userEmailSchema.required(),
  password: userPasswordSchema.required(),
  isAdmin:userAdminSchema
};

const updateUserSchema = {
  first_name: userFirstNameSchema,
  last_name: userLastNameSchema,
  user_name: userUserNameSchema,
  email: userEmailSchema,
  password: userPasswordSchema,
};

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
};
