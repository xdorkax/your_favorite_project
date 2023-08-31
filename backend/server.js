const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");
const cors = require("cors")

app.use(cors())
app.use(express.json());

const BLOG_PATH = path.join(__dirname, "data", "blogs.json");

app.get('/api/blogs', (req, res) => {
  fs.readFile(BLOG_PATH, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Hiba történt a blogok beolvasása során.");
      return;
    }

    const blogs = JSON.parse(data);
    res.json(blogs);
  });
});

app.post('/api/blogs', (req, res) => {
  fs.readFile(BLOG_PATH, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Hiba történt a blogok beolvasása során.");
      return;
    }

    const blogs = JSON.parse(data);
    const newBlog = req.body; 
    blogs.push(newBlog);

    fs.writeFile(BLOG_PATH, JSON.stringify(blogs), "utf8", (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Hiba történt az új blog írása során.");
        return;
      }

      res.json(newBlog);
    });
  });
});

app.listen(3000, () => {
  console.log('A szerver fut a http://localhost:3000 címen.');
});
