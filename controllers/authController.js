const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, name: newUser.name },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('Token', token, );
    res.cookie('ID', newUser._id, );
    res.cookie('User', newUser.name, );

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set cookies (if needed)
    res.cookie('Token', token, { secure: true, httpOnly: true });
    res.cookie('ID', user._id.toString(), { secure: true, httpOnly: true });
    res.cookie('User', user.name, { secure: true, httpOnly: true });
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_END_URL);
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    res.status(200).json({ message: 'User logged in successfully', token });

  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};