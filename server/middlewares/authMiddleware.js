const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const protect = async (req, res, next) => {

  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
    
  } catch (error) {
    return res.status(401).json({ message: "Access Denied. Invalid or expired token." });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access Denied. Admin privileges required." });
  }
};

module.exports = { protect, admin };