const express = require('express');
let router = express.Router();
const ExpertController = require('../controllers/expert.controller');
const { body, param } = require('express-validator');
const AuthController = require('../controllers/auth.controller');

const expertValidations = [
  body('name').isString(),
  body('expertise').isString(),
];

router.route('/')
  .get(AuthController.checkAuth, ExpertController.get)
  .post(AuthController.checkAuth, expertValidations, ExpertController.create);

router.route('/:id')
    .get(AuthController.checkAuth, [param('id').isMongoId()], ExpertController.getOne)
    .put(AuthController.checkAuth, [
      param('id').isMongoId(),
      body('_id').isMongoId(),
      ...expertValidations,
    ], ExpertController.update)
    .delete(AuthController.checkAuth, [param('id').isMongoId()], ExpertController.delete);

module.exports = router;
