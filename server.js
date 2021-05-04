const fs = require('fs');
const express = require('express');
const port = process.env.PORT || 8080;
const app = express();

var blogData = JSON.parse(fs.readFileSync('blog-data.json'));

app.get('/blog-data.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(blogData));
});

app.post('/blog-data.json', function (req, res) {
  blogData.push(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(blogData));
});

app.use(express.static(__dirname + '/dist/'));

app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
})

app.listen(port);

console.log("server started");