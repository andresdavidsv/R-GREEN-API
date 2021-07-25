const express = require('express');
const passport = require('passport');
const MaterialsService = require('../services/materials');

const {
  materialIdSchema,
  createMaterialSchema,
  updateMaterialSchema,
} = require('../utils/schemas/materials');

const validationHandler = require('../utils/middleware/validationHandlers');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');

//JWT strategy
require('../utils/auth/strategies/jwt');

function materialsApi(app) {
  const router = express.Router();
  app.use('/api/v1/materials', router);

  const materialsService = new MaterialsService();

  router.get('/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:materials']),
    async function (req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { tags } = req.query;

      try {
        const materials = await materialsService.materialsService({ tags });

        res.status(200).json({
          data: materials,
          message: 'materials listed',
        });
      } catch (err) {
        next(err);
      }
    });

  router.get(
    '/:materialId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:materials']),
    validationHandler({ materialId: materialIdSchema }, 'params'),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { materialId } = req.params;

      try {
        const material = await materialsService.getMaterial({ materialId });

        res.status(200).json({
          data: material,
          message: 'material retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:materials']),
    validationHandler(createMaterialSchema),
    async function (req, res, next) {
      const { body: material } = req;
      try {
        const createdMaterialId = await materialsService.createMaterial({ material });

        res.status(201).json({
          data: createdMaterialId,
          message: 'material created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:materialId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:materials']),
    validationHandler({ materialId: materialIdSchema }, 'params'),
    validationHandler(updateMaterialSchema),
    async function (req, res, next) {
      const { materialId } = req.params;
      const { body: material } = req;

      try {
        const updatedMaterialId = await materialsService.updateMaterial({
          materialId,
          material,
        });

        res.status(200).json({
          data: updatedMaterialId,
          message: 'material updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:materialId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:materials']),
    validationHandler({ materialId: materialIdSchema }, 'params'),
    async function (req, res, next) {
      const { materialId } = req.params;

      try {
        const deleteMaterialId = await materialsService.deleteMaterial({ materialId });

        res.status(200).json({
          data: deleteMaterialId,
          message: 'material deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = materialsApi;