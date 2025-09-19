const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new user
// /api/users/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    // Generate JWT token
    const payload = { user: { id: user.id, role: user.role } };

    //sign and return token along with user details
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;

        // Send the token and user details in the response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login user
// /api/users/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user by email
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    //check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const payload = { user: { id: user.id, role: user.role } };

    //sign and return token along with user details
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;

        // Send the token and user details in the response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get user profile
// /api/users/profile
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
