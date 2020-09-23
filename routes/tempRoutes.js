const temperature = require('../schemas/tempSchema')
const formatDate = require('../functions/formatDate').formatDate

module.exports = function(app){
app.get('/temps/tempcsv', async function(req, res) {
    temperature.find((err, temps)=>{
      if(err){
        console.log(err)
      }else{
        var tempToCsv = []
  
      temps.forEach((tempObj)=>{
        var tempArr = [formatDate(tempObj.createdAt),tempObj.temperature]
        tempToCsv.push(tempArr)
      })
  
      tempToCsv.push(['Time', 'Room'])
      tempToCsv = tempToCsv.reverse()
  
      res.statusCode = 200;
      res.setHeader('Content-disposition', 'attachment; filename=roomTemps.csv');
      res.setHeader('Content-Type', 'text/csv');
      
      tempToCsv.forEach(function(item) {
        res.write(item.map(function(field) {
          return field.toString();
        }).toString() + '\r\n');
      });
      res.end();
      }
    }).sort({$natural:-1}).limit(60)
  });
  
    
  // ROUTES FOR SENDING TEMPERATURES TO DB
  app.post("/temps/data", async(req, res)=>{
  
    console.log(req.body.pw)
  
    if(req.body.pw == "FDAf12f*dsa36d@"){
      var newTemp = new temperature({
        temperature: req.body.temp,
        dateStr: req.body.dateStr
      })
  
    await newTemp.save((err)=>{
      if(err){
        console.log("ERROR")
      }else{
      console.log("save successful!")
      }
    }) 
  }
  res.end()
  })
}