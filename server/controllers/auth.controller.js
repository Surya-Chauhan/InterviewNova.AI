import genToken from "../config/token.js";
import User from "../models/user.model.js";

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
      });
    }

    const token = await genToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Google auth error: ${error.message}`,
    });
  }
};

export const emailSignup = async (req, res) => {
  try {
    const { name, email, uid } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Create new user
    user = await User.create({
      name,
      email,
      firebaseUid: uid,
    });

    const token = await genToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Email signup error: ${error.message}`,
    });
  }
};

export const emailLogin = async (req, res) => {
  try {
    const { uid, email } = req.body;

    // Find user by email or Firebase UID
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.findOne({ firebaseUid: uid });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const token = await genToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Email login error: ${error.message}`,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Logout error: ${error.message}`,
    });
  }
};