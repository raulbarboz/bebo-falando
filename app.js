const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');
const device = require('express-device');
const PORT = process.env.PORT || 8080


require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static('./assets'))
app.use(bodyParser.urlencoded({extended : true}));
app.use(device.capture());

var obj = JSON.parse(fs.readFileSync('list.json', 'utf8'));
var obj = obj.items;

app.get('/', (req, res) => {
  res.render('home', {title: 'home', device: req.device.type});
})

app.get('/videos', (req, res) => {
  res.render('videos', {videos: obj, title: 'videos', device: req.device.type});
})

app.get('/contato', (req, res) => {
  res.render('contato', {title: 'contato', device: req.device.type});
})

app.use((req, res) => {
  res.status(404).render('404')
})

app.listen(PORT, () => {
});
