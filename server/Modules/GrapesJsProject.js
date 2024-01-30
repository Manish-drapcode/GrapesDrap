const mongoose = require('mongoose');

// Define the schema for GrapesJS project
const grapesJSSchema = new mongoose.Schema({
 
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed, // This allows storing arbitrary data
    required: true,
  },
});

// Create the GrapesJS model
const GrapesJSProject = mongoose.model('GrapesJSProject', grapesJSSchema);

module.exports = GrapesJSProject;