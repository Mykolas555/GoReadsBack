const jwt = require('jsonwebtoken');

exports.tokenProtection = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Assuming the token is sent as "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing or invalid' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Add the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

