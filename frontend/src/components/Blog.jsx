import React, { useEffect, useState } from "react";
import { Button, TextField, Stack, Paper, Typography } from "@mui/material";

function Blog() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  async function getBlogs() {
    try {
      const response = await fetch("http://localhost:3000/api/blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Hiba történt a blogok lekérése során:", error);
    }
  }

  async function sendBlog(event) {
    event.preventDefault();
    const data = {
      title: title,
      text: text,
    };
    const req = await fetch("http://localhost:3000/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await req.json();
    getBlogs();
    setTitle("");
    setText("");
  }

  return (
    <>
      <Paper style={{margin:"32px", padding:"20px"}}>
      <Typography variant="h2">Blog</Typography>
        <form onSubmit={sendBlog}>
          <Stack spacing={2}>
            <TextField
              id="standard-basic"
              label="Blog Title"
              variant="standard"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              label="Blog Text"
              variant="outlined"
              multiline
              rows={4}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <Button variant="contained"
              type="submit"
            >
              Send
            </Button>
          </Stack>
        </form>

        <Paper style={{padding:"10px"}}>
          {blogs.map((blog, index) => (
            <div key={index}>
              <h3>{blog.title}</h3>
              <p>{blog.text}</p>
              <hr />
            </div>
          ))}
        </Paper>
      </Paper>
    </>
  );
}

export default Blog;
