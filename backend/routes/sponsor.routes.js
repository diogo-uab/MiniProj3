const express = require('express');
let router = express.Router();
const SponsorController = require('../controllers/sponsor.controller');
const { body, param } = require('express-validator');
const AuthController = require('../controllers/auth.controller');

const sponsorValidations = [
  body('name').isString(),
  body('photo').isURL(),
  body('animal').isMongoId(),
];

router.route('/')
  .get(AuthController.checkAuth, SponsorController.get)
  .post(AuthController.checkAuth, sponsorValidations, SponsorController.create);

router.route('/:id')
    .get(AuthController.checkAuth, [param('id').isMongoId()], SponsorController.getOne)
    .put(AuthController.checkAuth, [
      param('id').isMongoId(),
      body('_id').isMongoId(),
      ...sponsorValidations,
    ], SponsorController.update)
    .delete(AuthController.checkAuth, [param('id').isMongoId()], SponsorController.delete);

module.exports = router;
