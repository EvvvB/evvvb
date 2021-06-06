const temperature = require('../schemas/tempSchema')
const formatDate = require('../functions/formatDate').formatDate



module.exports = function(app){



  var tempToCsv = []

  temperature.find((err, temps)=>{
    if(err){
      console.log(err)
    }else{

      temps.forEach((tempObj)=>{//add api temp
        if(tempObj.apiTemperature){//checking for api temp
          var tempArr = [formatDate(tempObj.createdAt),tempObj.temperature, tempObj.apiTemperature]            
        }else{
          var tempArr = [formatDate(tempObj.createdAt),tempObj.temperature]
        }
        
        tempToCsv.push(tempArr)
      })
      
      tempToCsv.push(['Time', 'Room', 'API (91911)'])
      tempToCsv = tempToCsv.reverse()
      }
    }).sort({$natural:-1}).limit(60)


  
  app.get('/temps/tempcsv', async function(req, res) {
   
      res.statusCode = 200;
      res.setHeader('Content-disposition', 'attachment; filename=roomTemps.csv');
      res.setHeader('Content-Type', 'text/csv');
      console.log(tempToCsv)
      tempToCsv.forEach(function(item) {
        res.write(item.map(function(field) {
          return field.toString();
        }).toString() + '\r\n');
      });
      res.end();
     
    
  });


  // ROUTES FOR SENDING TEMPERATURES TO DB
  app.post("/temps/data", async(req, res)=>{
  
    console.log(req.body.pw)
    console.log(req.body.dateStr)

    if(req.body.pw == process.env.POST_PASS){
      var newTemp = new temperature({
        temperature: req.body.temp,
        apiTemperature: req.body.apiTemp,
        dateStr: req.body.dateStr
      })
  
    await newTemp.save((err)=>{
      if(err){
        console.log("ERROR")
      }else{
      console.log("save successful!")
        //add api temp
      var tempArr = [req.body.dateStr, req.body.temp, req.body.apiTemp]
      tempToCsv.splice(1,1)
      tempToCsv.push(tempArr)
      console.log(tempToCsv)
    }
    }) 
  }
  res.end()
  })











// app.get('/temps/tempcsv', async function(req, res) {
//     temperature.find((err, temps)=>{
//       if(err){
//         console.log(err)
//       }else{
//         var tempToCsv = []
  
//       temps.forEach((tempObj)=>{
//         var tempArr = [formatDate(tempObj.createdAt),tempObj.temperature]
//         tempToCsv.push(tempArr)
//       })
  
//       tempToCsv.push(['Time', 'Room'])
//       tempToCsv = tempToCsv.reverse()
  
//       res.statusCode = 200;
//       res.setHeader('Content-disposition', 'attachment; filename=roomTemps.csv');
//       res.setHeader('Content-Type', 'text/csv');
      
//       tempToCsv.forEach(function(item) {
//         res.write(item.map(function(field) {
//           return field.toString();
//         }).toString() + '\r\n');
//       });
//       res.end();
//       }
//     }).sort({$natural:-1}).limit(60)
//   });




}


