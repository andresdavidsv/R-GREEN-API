const joi = require('@hapi/joi');

const { materialIdSchema } = require('./materials');
const { userIdSchema } = require('./users');

const userMaterialIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserMaterialSchema = {
  userId: userIdSchema,
  materialId: materialIdSchema,
};
const updateUserMaterialSchema = {
  userId: userIdSchema,
  materialId: materialIdSchema,
};

module.exports = {
  userMaterialIdSchema,
  createUserMaterialSchema,
  updateUserMaterialSchema
};
