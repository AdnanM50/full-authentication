import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/genarateTokenAndsetCookie.js";
import { sendevarificationmail } from "../mailtrap/email.js";

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
    //jwt

    // await sendevarificationmail(user.email, varificationToken);
    console.log("Starting email send process");
await sendevarificationmail(user.email, varificationToken);
console.log("Email send process completed");

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
export const login = async (req, res) => {
  res.send("Signup route");
};
export const logout = async (req, res) => {
  res.send("Signup route");
};
