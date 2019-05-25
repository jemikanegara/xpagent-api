// Model
const User = require("../../../models/user");

//  Bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

// JWT
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// Check if database returned a value
const findUser = user => {
  if (!user) {
    throw Error("User not found");
  }
};

// Register
exports.userRegister = async (root, { user }) => {
  const { userEmail, userPassword } = user;
  if (!userEmail) {
    throw Error("email invalid");
  }
  if (!userPassword) {
    throw Error("password invalid");
  }
  const hashPassword = await bcrypt.hash(userPassword, saltRounds);
  const newUser = await new User({
    userEmail,
    userPassword: hashPassword,
    lastLogin: new Date()
  });
  return await newUser
    .save()
    .then(async createdUser => {
      const token = await jwt.sign(
        { _id: createdUser._id, userEmail: createdUser.userEmail },
        secret,
        { expiresIn: 60 * 15 }
      );
      return { token };
    })
    .catch(() => {
      throw Error("Email already registered");
    });
};

// Login
exports.userLogin = async (root, { user }, { decoded, receivedToken }) => {
  if (decoded) {
    return { token: receivedToken };
  }
  const { userEmail, userPassword } = user;
  if (!userEmail) {
    throw Error("email invalid");
  }
  if (!userPassword) {
    throw Error("password invalid");
  }
  const checkUser = await User.findOne({ userEmail });
  if (!checkUser) {
    throw Error("user not found");
  }
  const checkPassword = await bcrypt.compare(
    userPassword,
    checkUser.userPassword
  );
  if (!checkPassword) {
    throw Error("password invalid");
  }
  const token = await jwt.sign(
    { _id: checkUser._id, userEmail: checkUser.userEmail },
    secret,
    { expiresIn: 60 * 15 }
  );
  return { token };
};

// Update
exports.userUpdate = async (root, { user }, { decoded, receivedToken }) => {
  if (!decoded) {
    throw Error("No access");
  }
  const { _id } = await decoded;
  const { userNewEmail, userPassword, userNewPassword } = user;
  // Don't let user change with old password
  if (userNewPassword === userPassword) {
    throw Error("This password already used");
  }

  // Check User & Password
  const checkUser = await User.findById(_id)
    .then(async user => {
      const isMatch = await bcrypt.compare(userPassword, user.userPassword);
      console.log(isMatch);
      return isMatch;
    })
    .catch(err => {
      console.log(err);
      throw Error("User not found");
    });
  console.log(checkUser);
  if (!checkUser) {
    throw Error("Incorrect password");
  }

  // Check New Password Field
  if (userNewPassword) {
    const newPassword = await bcrypt.hash(userNewPassword, saltRounds);
    console.log(newPassword);
    const getToken = await User.findByIdAndUpdate(
      _id,
      { userPassword: newPassword },
      { new: true }
    ).then(user => {
      findUser(user);
      return { token: receivedToken };
    });
    return getToken;
  }

  // Check New Email Field
  if (userNewEmail) {
    return await User.findByIdAndUpdate(
      _id,
      { userEmail: userNewEmail },
      { new: true }
    ).then(async user => {
      findUser(user);
      const { _id, userEmail } = user;
      const newToken = await jwt.sign({ _id, userEmail }, secret, {
        expiresIn: 60 * 15
      });
      return { token: newToken };
    });
  }

  throw Error("Cannot update empty field");
};
