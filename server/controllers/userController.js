const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password, dob } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstname,
      lastname,
      email,
      phone,
      hashedPassword,
      dob,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, proccess.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.status(201).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, proccess.env.JWT_SECRET, {
      expiresIn: "1hr",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
};

const getUser = async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "User Not Found" });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Invalid Token" });
  }
};

module.exports = { login, register, getUser };
