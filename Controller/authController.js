import User from "../modal/User.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import attachCookie from "../Utils/attachCookie.js";

const Register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User exists" });
    }
    const user = await User.create({ username, email, password });

    const token =await user.createJWT();
    attachCookie({ res, token });
    res.json({
      user: {
        email: user.email,
        username: user.username,
      },
    token,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error registering the user" });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Validate the password

    let isPasswordValid = false;
    if (user.password === password) {
      isPasswordValid = true;
    }

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token
    // You may want to set the token as a cookie or in the response header based on your frontend needs
    const token = user.createJWT();
    attachCookie({ res, token });
    res.status(200).json({
      user,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
};

const Logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  
  res.status(200).json({ msg: "user logged out!" });
};

export { Login, Register, Logout };
