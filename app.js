const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');
const PORT = process.env.PORT || 8080


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
  res.render('home', {title: 'home'});
})

app.get('/videos', (req, res) => {
  res.render('videos', {ids: objArray, title: 'videos'});
})

app.get('/contato', (req, res) => {
  res.render('contato', {title: 'contato'});
})

app.use((req, res) => {
  res.status(404).render('404')
})

app.listen(PORT, () => {
});
