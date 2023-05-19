const express = require("express");
const router = express.Router();

const fs = require("fs");

// Lấy dữ liệu của 1 post
router.get("/:id", (req, res) => {
  let { id } = req.params;
  //   console.log(id);
  try {
    let post = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
    let findPost = post.find((u, i) => u.id === +id);
    if (findPost) {
      res.json(findPost);
    } else {
      res.json({
        message: "Post not found",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

// Lấy dữ liệu của toàn bộ Posts
router.get("/", (req, res) => {
  try {
    let posts = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
    console.log(posts);
    res.json(posts);
  } catch (error) {
    res.json({
      error,
    });
  }
});

// Thêm mới dữ liệu về 1 post vào trong CSDL
router.post("/", (req, res) => {
  let { title, body } = req.body;
  if (!title || !body) {
    res.json({
      messages: "Thông tin không hợp lệ",
    });
  } else {
    let newPost = {
      userId: Math.floor(Math.random() * 1000000),
      id: Math.floor(Math.random() * 1000000),
      title: title,
      body: body,
    };
    try {
      let posts = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
      posts.push(newPost);
      fs.writeFileSync("./user-post-api/posts.json", JSON.stringify(posts));
      res.json({
        messages: "Create Post Successfully!",
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  }
});

// Chỉnh sửa dữ liệu của 1 post
router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { title, body } = req.body;
  let posts = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
  try {
    let findPost = posts.findIndex((u, i) => u.id === +id);
    if (findPost === -1) {
      res.json({
        message: "Post Not Found",
      });
    } else if (!title || !body) {
      res.json({
        messages: "Thông tin không hợp lệ",
      });
    }
    posts[findPost] = Object.assign({}, posts[findPost], {
      title: title,
      body: body,
    });
    fs.writeFileSync("./user-post-api/posts.json", JSON.stringify(posts));
    res.json({
      message: "Update successfully",
    });
  } catch (error) {
    error;
  }
});

// Xoá dữ liệu về một post
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let posts = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
  try {
    const postIndex = posts.findIndex((u, i) => u.id === +id);
    if (postIndex === -1) {
      throw new Error("Post Not Found");
    }
    posts.splice(postIndex, 1);
    fs.writeFileSync("./user-post-api/posts.json", JSON.stringify(posts));
    res.json({
      message: "Delete successfully",
    });
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});
module.exports = router;
