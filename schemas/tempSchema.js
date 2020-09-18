var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// MONGOOSE MODELS/SCHEMA
var temperatureSchema = new Schema({
    temperature:  Number, // String is shorthand for {type: String}
    dateStr: String,
    createdAt:{
      type: Date, default: Date.now
    }
});
  
  var temperature = mongoose.model("temperatures", temperatureSchema);

  module.exports = temperature;