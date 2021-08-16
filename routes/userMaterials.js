const express = require('express');
const passport = require('passport');
const UserMaterialsService = require('../services/userMaterials');

const {
  userIdSchema,
} = require('../utils/schemas/users');
const {
  materialIdSchema,
} = require('../utils/schemas/materials');
const {
  userMaterialIdSchema,
  createUserMaterialSchema,
  updateUserMaterialSchema
} = require('../utils/schemas/userMaterials');

const validationHandler = require('../utils/middleware/validationHandlers');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');

//JWT strategy
require('../utils/auth/strategies/jwt');

function usersMaterialsApi(app) {
  const router = express.Router();
  app.use('/api/v1/user-materials', router);

  const userMaterialsService = new UserMaterialsService();

  router.get('/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:user-materials']),
    validationHandler({ userId: userIdSchema }, 'query'),
    async function (req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { userId } = req.query;

      try {
        const userMaterials = await userMaterialsService.getUserMaterials({ userId });

        res.status(200).json({
          data: userMaterials,
          message: 'user materials listed',
        });
      } catch (err) {
        next(err);
      }
    });

  router.get(
    '/:userMaterialId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:user-materials']),
    validationHandler({ userMaterialId: userMaterialIdSchema }, 'params'),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { userMaterialId } = req.params;

      try {
        const userMaterials = await userMaterialsService.getMaterial({ userMaterialId });

        res.status(200).json({
          data: userMaterials,
          message: 'user material retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:user-materials']),
    validationHandler(createUserMaterialSchema),
    async function (req, res, next) {
      const { body: userMaterial } = req;
      try {
        const createdUserMaterialId = await userMaterialsService.createUserMaterial({ userMaterial });

        res.status(201).json({
          data: createdUserMaterialId,
          message: 'user material created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:userMaterialId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:user-materials']),
    validationHandler({ userMaterialId: userMaterialIdSchema }, 'params'),
    validationHandler(updateUserMaterialSchema),
    async function (req, res, next) {
      const { userMaterialId } = req.params;
      const { body: userMaterial } = req;

      try {
        const updatedUserMaterialId = await userMaterialsService.updateMaterial({
          userMaterialId,
          userMaterial,
        });

        res.status(200).json({
          data: updatedUserMaterialId,
          message: 'user Material updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:userMaterialId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:user-materials']),
    validationHandler({ userMaterialId: materialIdSchema }, 'params'),
    async function (req, res, next) {
      const { userMaterialId } = req.params;

      try {
        const deleteUserMaterialId = await userMaterialsService.deleteUserMaterial({ userMaterialId });

        res.status(200).json({
          data: deleteUserMaterialId,
          message: 'user Material deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = usersMaterialsApi;