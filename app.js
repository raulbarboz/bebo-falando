const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');


require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static('./assets'))
app.use(bodyParser.urlencoded({extended : true}));

var obj = JSON.parse(fs.readFileSync('list.json', 'utf8'));
var obj = obj.items;
var objArray = [];

for(i = 0; i < obj.length; i++){
  objArray.push(obj[i].snippet.resourceId.videoId);
}

app.get('/', (req, res) => {
  res.render('home', {ids: objArray});
})

app.use((req, res) => {
  res.status(404).render('404')
})

app.listen(3000, () => {
  console.log('running on 3000');
});