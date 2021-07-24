const joi = require('@hapi/joi');

const materialIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const materialTypeNameSchema = joi.string().min(5).max(15);
const materialWeightSchema = joi.number().integer().min(2).max(2000);


const createMaterialSchema = {
  type_name: materialTypeNameSchema.required(),
  wieght: materialWeightSchema.required(),
};

const updateMaterialSchema = {
  type_namee: materialTypeNameSchema,
  wieght: materialWeightSchema
};

module.exports = {
  materialIdSchema,
  createMaterialSchema,
  updateMaterialSchema,
};