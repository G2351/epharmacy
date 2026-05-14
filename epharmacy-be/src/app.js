require("dotenv").config();
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());

// init middleware
app.use(morgan("dev")); // 
app.use(helmet()); // bảo vệ thông tin dự án
app.use(compression()); // giảm dung lượng file được gửi đi
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init router
app.use("/", require("./routes"));

// handle error
app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  console.log("error", error);
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    // stack: error.stack,
    message: error.message || "Internal Error Server",
  });
});
module.exports = app;
