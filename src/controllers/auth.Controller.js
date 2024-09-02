import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/genarateTokenAndsetCookie.js";
// import { sendevarificationmail } from "../mailtrap/email.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const userallreadyexist = await User.findOne({ email });
    console.log("🚀 ~ signup ~ userallreadyexist:", userallreadyexist);
    if (userallreadyexist) {
      return res
        .status(400)
        .json({ success: "false", message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const varificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = await User({
      email,
      password: hashedPassword,
      name,
      varificationToken,
      varificationExpiresAt: Date.now() + 10 * 60 * 1000,
    });
    await user.save();
    generateTokenAndSetCookie(res, user._id);
    // await sendevarificationmail(user.email, varificationToken);
    // console.log("Starting email send process");
    // await sendevarificationmail(user.email, varificationToken);
    // console.log("Email send process completed");

    // res.status(201).json({
    //   success: "true",
    //   message: "User created successfully",
    //   user: {
    //     ...User._doc,
    //     password: undefined,
    //   },
    // });
    res.status(201).json({
      success: "true",
      message: "User created successfully",
      user: {
        email: user.email,
        name: user.name,
        // Exclude password and other sensitive info
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: "false", message: "Something went wrong" });
  }
};

export const varifyemail = async (req, res) => {
  const { varificationToken } = req.body;
  try {
    if (!varificationToken) {
      return res.status(400).json({ message: "Please provide a varification token" });
    }
    const user = await User.findOne({ varificationToken });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (user.varificationToken !== varificationToken) {
      return res.status(400).json({ message: "Invalid varification token" });
    }
    if (user.varificationExpiresAt < Date.now()) {
      return res.status(400).json({ message: "Varification token expired" });
    }
    user.isvarified = true;
    await user.save();
    res.status(200).json({
      success: "true",
      message: "User varified successfully",
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: "false", message: "Something went wrong" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const user = await User.findOne ({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateTokenAndSetCookie(res, user._id);
    res.status(200).json({
      success: "true",
      message: "User logged in successfully",
      user: {
        email: user.email,
        name: user.name,
        // Exclude password and other sensitive info
      },
    });
  }
  catch (error) {
    console.log(error);
    res.status(400).json({ success: "false", message: "Something went wrong" });
  }
     
};
export const logout = async (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
  
};
