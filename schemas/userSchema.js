var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// MONGOOSE MODELS/SCHEMA
var userSchema = new Schema({
    username:  String, // String is shorthand for {type: String}
    password:   String,
    level: String,
    createdAt:{
      type: Date, default: Date.now
    }
  });
  
  var user = mongoose.model("users", userSchema);

  module.exports = user;