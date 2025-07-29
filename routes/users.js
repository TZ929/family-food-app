const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Register a new user
router.route('/register').post(async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'An account with that username already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ id: savedUser._id, username: savedUser.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User login
router.route('/login').post(async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ msg: 'No account with this username has been registered.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: 'Invalid credentials.' });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected route example
router.route('/profile').get(auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 