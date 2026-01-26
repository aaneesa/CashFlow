import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Name, email, and password are required" });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({ msg: "Name must be at least 2 characters" });
    }
    if (!isNaN(name)) {
      return res.status(400).json({ msg: "Name cannot be only numbers" });
    }


    if (password.trim().length < 4) {
      return res.status(400).json({ msg: "Password must be at least 4 characters" });
    }
    if (!isNaN(password)) { 
      return res.status(400).json({ msg: "Password cannot be only numbers" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email,
      password: hash,
    });

    res.status(201).json({ id: user._id, name: user.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error registering user" });
  }
};



export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, type: "user", isPremium: user.isPremium },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user: { id: user._id, name: user.name, isPremium: user.isPremium } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

export const userLogout = (req, res) => {
  res.json({ msg: "User logged out" });
};