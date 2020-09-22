
const update = require("../schemas/updateSchema");
// var mongoose = require('mongoose');


module.exports = function(app){
  app.get("/update",(req, res) => {
    update.find({}, function(err,data) { 
      if(err){
          console.log(err);
          res.send(500).status;
      }
      else {
          res.render('update.ejs', {data : data});
          }            
    })
  })

  app.post("/update", async (req, res)=>{
    console.log("update request")
    console.log(req.body.password)
    if(req.body.password == "lkajfd09!@#asdf-0"){
     var newUpdate = new update({
        title:  req.body.title,
        body:   req.body.body
      });
  
      await newUpdate.save(function (err) {
        if (err) return handleError(err);
      });
    }
      res.redirect('/update')
   })
  
  app.get("/update/new",(req, res)=>{
      res.render('updateNew.ejs')
    })

  app.get("/update/:id", (req,res)=>{
    update.findById(req.params.id, (err,data)=> { 
      if(err){
          console.log(err);
          res.sendStatus(500).status;
      }
      else {
          res.render('readUpdate.ejs', {data : data});
          }            
    })
  })
  
  app.get("/update/delete/:id", (req, res)=>{
  
      console.log("testing")
      console.log(req.params.id)
      update.findByIdAndDelete(req.params.id, (err)=>{
        if(err){ 
          console.log(err)
        }else{
          console.log("Successful deletion");
        }
      })
    res.redirect("/update")
  })
  
}