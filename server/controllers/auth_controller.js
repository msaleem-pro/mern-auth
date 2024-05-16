const userModel = require("../models/user_model");
const genError = require("../utils/error");
const { hashPassword, comparePassword } = require("../utils/encryptPassword");
const { sign } = require("../utils/JWT-Auth");
const generator = require("generate-password");
const getFirstWord = require("../utils/firstWord");
// _______________________________________________________________

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    username == "" ||
    !email ||
    email == "" ||
    !password ||
    password == ""
  ) {
    return next(genError(400, "All fields are required."));
  }
  try {
    const verifyEmail = await userModel.findOne({ email });
    if (verifyEmail) {
      return next(genError(400, "Email already exists"));
    }
    const hashedPassword = await hashPassword(password);
    const user = { username, email, password: hashedPassword };
    const addUser = await userModel.create(user);
    if (!addUser) {
      return next(genError(400, "User cannot be created"));
    }
    return res.status(200).json({
      success: true,
      status: "OK",
      msg: "User has been added.",
    });
    //--------------------------------------------
  } catch (error) {
    return next(error);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email == "" || !password || password == "") {
    return next(genError(400, "All fields are required."));
  }
  try {
    const verifyUser = await userModel.findOne({ email });
    const verifyPassword = await comparePassword(password, verifyUser.password);
    if (!verifyUser || !verifyPassword) {
      return next(genError(400, "Email or Password are incorrect."));
    }
    const token = sign({
      username: verifyUser.username,
      email: verifyUser.email,
    });
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 3600000), // Set expiration to 1 hour from now
      })
      .status(200)
      .json({
        success: true,
        status: "OK",
        msg: "Logged in",
        user: {
          id: verifyUser._id,
          username: verifyUser.username,
          email: verifyUser.email,
        },
      });
  } catch (error) {
    return next(error);
  }
};

const googleAuth = async (req, res, next) => {
  const { displayName, email, profileImg } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      const token = sign({
        id: existingUser._id,
        email: existingUser.email,
      });
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          expires: new Date(Date.now() + 3600000), // Set expiration to 1 hour from now
        })
        .status(200)
        .json({
          success: true,
          status: "OK",
          msg: "Logged in",
          user: {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            profileImg: existingUser.profileImg,
          },
        });
    } else {
      const password = generator.generate({
        length: 8,
        numbers: true,
        uppercase: true,
        lowercase: true,
      });
      const hashedPassword = await hashPassword(password);
      const username =
        getFirstWord(displayName) +
        "_" +
        generator.generate({
          length: 4,
          numbers: true,
          uppercase: true,
          lowercase: true,
        });
      const user = { username, email, password: hashedPassword, profileImg };
      const addUser = await userModel.create(user);
      if (!addUser) {
        return next(genError(400, "User cannot be created"));
      }
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          expires: new Date(Date.now() + 3600000), // Set expiration to 1 hour from now
        })
        .status(200)
        .json({
          success: true,
          status: "OK",
          msg: "Logged in",
          user: {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            profileImg: existingUser.profileImg,
          },
        });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn, googleAuth };
