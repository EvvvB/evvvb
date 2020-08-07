const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
//setting public directory from which serving files (CSS)
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('mainpage.ejs')
})

app.get('/data', (req, res) => {
  res.render('data.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})