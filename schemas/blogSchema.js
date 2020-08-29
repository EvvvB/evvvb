var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// MONGOOSE MODELS/SCHEMA
var updateSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
    body:   String,
    createdAt:{
      type: Date, default: Date.now
    }
  });
  
  var update = mongoose.model("updates", updateSchema);

  module.exports = update;