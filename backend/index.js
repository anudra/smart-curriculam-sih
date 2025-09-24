const express = require("express");
require("dotenv").config();

const userRouter = require("./routes/user");

const { connectToMongoDB } = require("./connection");
const { authenticateUser } = require("./middlewares/auth");

// MongoDB Connection
connectToMongoDB(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

// middlewares
app.use(express.json());

// router registrations
app.use("/api/users", userRouter);

app.get("/api/hello", (req, res) => {
  return res.status(200).json({ message: "Hello World" });
})

// GET endpoint to check if user is logged in or not
app.get("/api/protected", authenticateUser, (req, res) => {
  res.status(200).json({ message: "authorised", user: req.user });
});

// POST endpoint to handle file upload
app.listen(process.env.PORT, () => {
  console.log(`Server Running at http://localhost:${process.env.PORT}`);
});
