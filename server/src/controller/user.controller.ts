import { handler } from "../helpers/handler";
import { create } from "./crud";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "../model/user.model";
import { generateAccessToken } from "../helpers/generateTokens";

export const registerUser = handler(async (req, res) => {
  const data = req.body;
  const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  const hashedPassword = await bcrypt.hash(data.password, salt);
  data.password = hashedPassword;
  if (!data.userName || !data.email || !data.password)
    throw new Error("Please provide all details");
  const newUser = await create("users", data);
  if (!newUser) throw new Error("User not created");
  res.status(200).json({
    message: "success",
    data: newUser,
  });
});

export const userLogin = handler(async (req, res) => {
  const data = req.body;
  const user = await findUserByEmail(data.email);
  if (!user) throw new Error("User not found");
  // if(data.password !=user.password) throw new Error("Invalid password");
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  };
  const accessToken = await generateAccessToken(user);
  res.status(200).cookie("accessToken", accessToken, options).json({
    message: "success",
    data: user,
  });
});
