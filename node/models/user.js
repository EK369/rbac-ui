const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String },
  status: { type: String, default: 'Active' },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true }, // Single reference
});

module.exports = mongoose.model('User', userSchema);