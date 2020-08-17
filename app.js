const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// mongoose told me to ???
mongoose.set('useUnifiedTopology', true);

// MONGOOSE LOCAL/PROD
if(process.env.PORT){
  var database = 'mongodb+srv://evvv:0vkg9scoJsOIYntu@cluster0.0u3nw.mongodb.net/evvvb?retryWrites=true&w=majority';
}else{
  var database = 'mongodb://localhost:27017/evvvb';
}
mongoose.connect(database, {useNewUrlParser: true});


// MONGOOSE SCHEMAS
var blog = require("../evvvb/schemas/blogSchema.js");
var user = require("../evvvb/schemas/userSchema.js");

// var newUser = new user({
//   username:  "pickle",
//   password:   "packle"
// });

// newUser.save(function (err) {
//   if (err) return handleError(err);
// });




//setting public directory from which serving files (CSS)
app.use(express.static(__dirname + '/public'));

//BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({ type: 'application/json' }));

// console.log(user.find({data: "asdfasdf"}))

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('mainpage.ejs')
})
app.get('/data',(req, res)=>{
  res.render('data.ejs')
})
//UPDATE ROUTES
app.get("/update",(req, res) => {
  blog.find({}, function(err,data) { 
    if(err){
        console.log(err);
        res.send(500).status;
    }
    else {
        res.render('blog.ejs', {data : data});
        }            
  })
})

app.get("/update/new",(req, res)=>{
  res.render('blogNew.ejs')
})


app.get("/update/delete/:id", (req, res)=>{
  console.log(req.body.password)
  if(req.body.password == "lkajfd09!@#asdf-0"){
    console.log("testing")
    findByIdAndDelete(req.params.id,(err)=>{
     if(err){
      console.log(err)
     }else{

    }});
  }
  res.redirect("/update")
})





app.get("/update/:id", (req,res)=>{
  blog.findById(req.params.id, (err,data)=> { 
    if(err){
        console.log(err);
        res.send(500).status;
    }
    else {
        res.render('readUpdate.ejs', {data : data});
        }            
  })
})




app.post("/update", async (req, res)=>{
  if(req.body.password == "lkajfd09!@#asdf-0"){
   var newBlog = new blog({
      title:  req.body.title,
      body:   req.body.body
    });

    await newBlog.save(function (err) {
      if (err) return handleError(err);
    });
  }
    res.redirect('/update')
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
// var newBlog = new blog({
//   title:  "a string",
//   body:   "another one"
//  });
// newBlog.save(function (err) {
//   if (err) return handleError(err);
// });



