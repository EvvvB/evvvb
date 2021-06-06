const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');


if(!process.env.PORT){
  require('dotenv').config()
}
// const functions = require('./functions/formatDate.js')

//MONGOOSE LOCAL/PROD
mongoose.set('useUnifiedTopology', true);
//var database = "mongodb+srv://evvv:97Ucqr8r2X00zsLF@cluster0.0u3nw.mongodb.net/evvvb?retryWrites=true&w=majority"
var database = (process.env.PORT) ? process.env.DB_CONNECT: 'mongodb://localhost:27017/evvvb'
mongoose.connect(database, {useNewUrlParser: true});

//setting public directory from which serving files (CSS)
app.use(express.static(__dirname + '/public'));

//BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({ type: 'application/json' }));
app.set('view engine', 'ejs');

// importing routes
require('./routes/updateRoutes')(app)
require('./routes/tempRoutes')(app)

app.get('/',(req, res)=>{
  res.render('mainpage.ejs')
})

app.get('/temps',(req, res)=>{
  res.render('temps.ejs');
})










// REGISTER ROUTES
app.get("/register", (req, res)=>{
  res.render("register.ejs")
})

app.post("/register", async (req, res)=>{
  try{
    var hashedPass = await bcrypt.hash(req.body.password, 10)
    var newUser = new user({
      username:  req.body.username,
      password:   hashedPass
    });
    console.log(newUser);
    
    newUser.save(function (err) {
      if (err) return handleError(err);
    });
  }catch{
    
  }
  res.redirect('/')
})

app.get("/register", (req, res)=>{
  res.render("register.ejs")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





// CREATE AND SAVE
// var newBlog = new update({
//   title:  "a string",
//   body:   "another one"
//  });
// newBlog.save(function (err) {
//   if (err) return handleError(err);
// });

// MONGOOSE SCHEMAS
// var update = require("../evvvb/schemas/updateSchema.js");


// var newUser = new user({
//   username:  "pickle",
//   password:   "packle"
// });

// newUser.save(function (err) {
//   if (err) return handleError(err);
// });
