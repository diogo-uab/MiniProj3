const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const sponsorSchema = new Schema({
  name: { type: String },
  photo: { type: String },
  animal: {
    type: String,
    ref: CONFIG.mongodb.collections.animal,
  },
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.sponsor, sponsorSchema);
