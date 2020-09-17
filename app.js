const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const temperature = require("./schemas/tempSchema")


//MONGOOSE LOCAL/PROD
// mongoose told me to ???
mongoose.set('useUnifiedTopology', true);

var database = (process.env.PORT) ? process.env.DB_CONNECT: 'mongodb://localhost:27017/evvvb'

// var database = 'mongodb+srv://evvv:97Ucqr8r2X00zsLF@cluster0.0u3nw.mongodb.net/evvvb?retryWrites=true&w=majority';
mongoose.connect(database, {useNewUrlParser: true});


//setting public directory from which serving files (CSS)
app.use(express.static(__dirname + '/public'));

//BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({ type: 'application/json' }));

// console.log(user.find({data: "asdfasdf"}))

app.set('view engine', 'ejs');

require('./routes/updateRoutes')(app)



app.get('/',(req, res)=>{
  res.render('mainpage.ejs')
})


app.get('/data',(req, res)=>{
  res.render('data.ejs')
})

app.get('/data/csv', function(req, res) {
  var data = [
      ['Day Index', 'Room', '91911', 'testing']
    , ['8/18/20', '"80"', '"75"', '"83"']
    , ['8/19/20', '"82"', '"76"', '"83"']
    , ['8/20/20', '"85"', '"74"', '"83"']
    , ['8/21/20', '"81"', '"70"', '"83"']
  ];

  res.statusCode = 200;
  res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
  res.setHeader('Content-Type', 'text/csv');
  
  data.forEach(function(item) {
    res.write(item.map(function(field) {
      return field.toString();
    }).toString() + '\r\n');
  });
  
  res.end();
});

// ROUTES FOR SENDING TEMPERATURES TO DB
app.post('/data/temperature', async (req, res)=>{
    
})

app.post("/temperature/data", async(req, res)=>{
  var newTemp = new temperature({
    temperature: req.body.temp
  })
  
  await newTemp.save((err)=>{
    if(err){
      console.log("ERROR")
    }
  else{
    console.log("save successful!")
  }
  }) 

  console.log("made a post request! :)")
  console.log(req.body.temp)
  res.redirect('/')

})












// REGISTER ROUTE
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
