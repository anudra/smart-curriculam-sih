const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/user");
const classRouter = require("./routes/class");

const { connectToMongoDB } = require("./connection");
const { authenticateUser } = require("./middlewares/auth");

// MongoDB Connection
connectToMongoDB(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(error => {
    console.log(error);
  });

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Allow specific methods
  })
);

// router registrations
app.use("/api/users", userRouter);
app.use("/api/classes", classRouter);

// A simple GET endpoint to test the server
app.get("/api/hello", (req, res) => {
  return res.status(200).json({ message: "Hello World" });
});

// GET endpoint to check if user is logged in or not
app.get("/api/protected", authenticateUser, (req, res) => {
  res.status(200).json({ message: "authorised", user: req.user });
});

// POST endpoint to handle file upload
app.listen(process.env.PORT, () => {
  console.log(`Server Running at http://localhost:${process.env.PORT}`);
});
