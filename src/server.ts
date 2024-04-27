import express from "express";
import { DbConnection } from "./dbconfig/dbConnect";
import { User } from "./models/Users";
const cors = require("cors");
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.PORT || 4001;
const secret = "asdfa34252";
// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

// Database connection
DbConnection()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });

// Root route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// User registration route
app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Use bcrypt's built-in salt generation

    // Create new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// User Login route

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (!userDoc) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }
  const passOk = bcrypt.compareSync(password, userDoc.password);
  console.log(userDoc);
  if (passOk) {
    jwt.sign({ email, id: userDoc._id }, secret, {}, (err: any, token: any) => {
      if (err) throw err;
      res.cookie("token", token).json("ok");
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
