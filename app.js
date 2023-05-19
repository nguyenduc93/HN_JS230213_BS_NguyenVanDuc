// B1: Khởi tạo server
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
// Định nghĩa các http requesr để hứng
// request từ phía client
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Import routes
const userRoutes = require("./routes/user.routes");
// const postRoutes = require("./routes/post.routes");

// Use routes
app.use("/api/v1/users", userRoutes);

// Import routes
const postRoutes = require("./routes/post.routes");
// const postRoutes = require("./routes/post.routes");

// Use routes
app.use("/api/v1/posts", postRoutes);

// Cài đặt cho server luôn luôn chờ đợi và lắng nghe
// Các request gửi lên từ phía client
app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
