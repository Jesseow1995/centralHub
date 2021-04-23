const fs = require('fs');
const cors = require('cors');
const express = require('express');
const port = 3001;
const app = express();

var blogData = JSON.parse(fs.readFileSync('blog-data.json'));

app.use(cors());
app.use(express.json());

app.get('/blog-data', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(blogData));
});

app.post('/blog-data', function (req, res) {
  if (!req.body) {
    res.send(JSON.stringify(blogData));
    return;
  }
  blogData.portfolio_blogs.push({ ...req.body, id: (blogData.portfolio_blogs[blogData.portfolio_blogs.length - 1].id + 1) });
  fs.writeFileSync('blog-data.json', JSON.stringify(blogData));
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(blogData));
});

app.delete(`/blog-data/:blogId`, function (req, res) {
  const blogId = req.params.blogId;
  blogData.portfolio_blogs = blogData.portfolio_blogs.filter(blog => blog.id != blogId)
  fs.writeFileSync('blog-data.json', JSON.stringify(blogData));
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(blogData))
})

app.listen(port);

console.log("server started");