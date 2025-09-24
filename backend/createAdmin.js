const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/User");
const { connectToMongoDB } = require("./connection");

// Connect to MongoDB
connectToMongoDB(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(error => {
    console.log("Error connecting to MongoDB:", error);
  });

// Function to create an admin user

async function createAdminUser(name, email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });
    console.log("Admin user created:", newUser);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

function main() {
  try {
    const name = "Admin User"; // Replace with desired admin name
    const email = "admin@example.com"; // Replace with desired admin email
    const password = "admin123"; // Replace with desired admin password
    createAdminUser(name, email, password);
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

main();
