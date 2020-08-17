var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// MONGOOSE MODELS/SCHEMA
var blogSchema = new Schema({
    title:  String, // String is shorthand for {type: String}
    body:   String,
    createdAt:{
      type: Date, default: Date.now
    }
  });
  
  var blog = mongoose.model("blogs", blogSchema);

  module.exports = blog;