const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: { type: String, required: true },
  permissions: [{ type: String }], // Array of permissions for the role
});

module.exports = mongoose.model('Role', roleSchema);
