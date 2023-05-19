const express = require("express");
const router = express.Router();

const fs = require("fs");

router.get("/:id", (req, res) => {
  let { id } = req.params;
  //   console.log(id);
  try {
    let user = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
    let findUser = user.find((u, i) => u.id === +id);
    if (findUser) {
      res.json(findUser);
    } else {
      res.json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
});

// Lấy về toàn bộ user
router.get("/", (req, res) => {
  try {
    let users = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
    console.log(users);
    res.json(users);
  } catch (error) {
    res.json({
      error,
    });
  }
});

// Thêm mới 1 user
router.post("/", (req, res) => {
  let { email, name, phone } = req.body;
  if (!phone || !email || !name) {
    res.json({
      messages: "Thông tin không hợp lệ",
    });
  } else {
    let newUser = {
      id: Math.floor(Math.random() * 100000000),
      name: name,
      email: email,
      username: null,
      address: {
        street: null,
        suite: null,
        city: null,
        zipcode: null,
        geo: {
          lat: null,
          lng: null,
        },
      },
      phone: phone,
      website: null,
      company: {
        name: null,
        catchPhrase: null,
        bs: null,
      },
    };
    try {
      let users = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
      users.push(newUser);
      fs.writeFileSync("./user-post-api/users.json", JSON.stringify(users));
      res.json({
        messages: "Create User Successfully!",
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  }
});

// Chỉnh sửa dữ liệu của 1 user
router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { email } = req.body;
  let users = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
  try {
    let findUser = users.findIndex((u, i) => u.id === +id);
    if (findUser === -1) {
      res.json({
        message: "User Not Found",
      });
    } else if (!email) {
      res.json({
        messages: "Thông tin không hợp lệ",
      });
    }
    users[findUser] = Object.assign({}, users[findUser], {
      email: email,
    });
    fs.writeFileSync("./user-post-api/users.json", JSON.stringify(users));
    res.json({
      message: "Update successfully",
    });
  } catch (error) {
    error;
  }
});

// Xóa 1 user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let users = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
  try {
    const userIndex = users.findIndex((u, i) => u.id === +id);
    if (userIndex === -1) {
      throw new Error("User Not Found");
    }
    users.splice(userIndex, 1);
    fs.writeFileSync("./user-post-api/users.json", JSON.stringify(users));
    res.json({
      message: "Delete successfully",
    });
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

// Lấy dữ liệu của toàn bộ Posts của 1 user
router.get("/:userId/posts", (req, res) => {
  let { userId } = req.params;
  try {
    let posts = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
    let findpost = posts.find((u, i) => u.userId === +userId);
    if (findpost) {
      res.json(findpost);
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

module.exports = router;
