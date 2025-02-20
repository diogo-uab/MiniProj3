const Sponsor = require('../models/sponsor.model');
const { validationResult } = require('express-validator');
const SponsorMessages = require('../messages/sponsor.messages');

exports.get = (req, res) => {
  Sponsor.find(req.query).populate('animal').exec((error, sponsors) => {
    if (error) throw error;
    let message = SponsorMessages.success.s2;

    if (sponsors.length < 0)
      message = SponsorMessages.success.s5;

    console.log('Get sponsors', sponsors);

    message.body = sponsors;
    return res.status(message.http).send(message);
  });
};

exports.create = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  new Sponsor({
    name: req.body.name,
    photo: req.body.photo,
    animal: req.body.animal,
  }).save((error, sponsor) => {
    if (error) throw error;
    sponsor.populate('animal', (error) => {
      if (error) throw error;
      let message = SponsorMessages.success.s0;
      message.body = sponsor;
      return res.header('location', '/sponsors/' + sponsor._id).status(message.http).send(message);
    });
  });
};

exports.update = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Sponsor.findOneAndUpdate({
    _id: req.params.id,
  }, {
    $set: req.body,
  }, {
    new: true,
  }, (error, sponsor) => {
    if (error) throw error;
    if (!sponsor) return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);
    sponsor.populate('animal', (error) => {
      if (error) throw error;
      let message = SponsorMessages.success.s1;
      message.body = sponsor;
      return res.status(message.http).send(message);
    });
  });
};

exports.delete = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Sponsor.deleteOne({
    _id: req.params.id,
  }, (error, result) => {
    if (error) throw error;
    if (result.deletedCount <= 0) return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);
    return res.status(SponsorMessages.success.s3.http).send(SponsorMessages.success.s3);
  });
};

exports.getOne = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Sponsor.findOne({
    _id: req.params.id,
  }).populate('animal').exec((error, sponsor) => {
    if (error) throw error;
    if (!sponsor) return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);
    let message = SponsorMessages.success.s2;
    message.body = sponsor;
    return res.status(message.http).send(message);
  });
};
