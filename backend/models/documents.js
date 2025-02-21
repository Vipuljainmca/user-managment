const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  path: { type: String, required: true },
});

module.exports = mongoose.model('Document', DocumentSchema);
