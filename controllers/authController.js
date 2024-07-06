const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  try {
    const { name, lastName, email, password, nickname } = req.body;
    if (!name || !lastName || !email || !password || !nickname) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    const existingNicknameUser = await User.findOne({ nickname });
    if (existingNicknameUser) {
      return res.status(400).json({ message: 'User with this nickname already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      nickname,
      name,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id, name: newUser.name }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({
     message: 'User registered successfully', 
     data:{
      userNickname: newUser.nickname,
      userName: newUser.name,
      userID: newUser._id,
      userToken: token
    }});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { nickname, password } = req.body;
    if (!nickname || !password) {
      return res.status(400).json({ message: 'Nickname and password are required' });
    }
    const user = await User.findOne({ nickname });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid nickname or password' });
    }
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.status(200).json({ 
      message: 'User logged in successfully',
      data:{
        userNickname: user.nickname,
        userName: user.name,
        userID: user._id,
        userToken: token
      }
    });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};