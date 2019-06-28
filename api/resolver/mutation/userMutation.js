// Model
const User = require("../../../models/user");
const Agent = require("../../../models/agent")

//  Bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

// JWT
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const expiresIn = '7d'

// Check if database returned a value
const findUser = user => {
  if (!user) {
    throw Error("User not found");
  }
};

exports.userEmailCheck = async (root, { email }) => {
  const user = await User.findOne({ userEmail: email }).exec()
  if (!user) return false
  if (user.userEmail === email) return true
  else return false
}

exports.tokenCheck = async (root, args, { decoded }) => {
  if (!decoded) return false
  const user = await User.findById(decoded._id)
  if (!user) return false
  if (user._id.toString() === decoded._id.toString()) return true
  else return false
}

// MUTATION : Register
exports.userRegister = async (root, { user }) => {
  const { userEmail, userPassword } = user;

  // Checking Email
  if (!userEmail) {
    throw Error("email invalid");
  }

  // Checking Password
  if (!userPassword) {
    throw Error("password invalid");
  }

  // Hashing Password
  const hashPassword = await bcrypt.hash(userPassword, saltRounds);

  // Create New User Object
  const newUser = await new User({
    userEmail,
    userPassword: hashPassword,
    lastLogin: new Date()
  });

  // Create New User on Database
  return await newUser
    .save()
    .then(async createdUser => {
      const token = await jwt.sign(
        { _id: createdUser._id, userEmail: createdUser.userEmail },
        secret,
        { expiresIn }
      );
      return { token };
    })
    .catch(() => {
      throw Error("Email already registered");
    });
};

// MUTATION : Login
exports.userLogin = async (root, { user }, { decoded, receivedToken }) => {
  // Deconstructure Email and Password
  const { userEmail, userPassword, isAgent } = user;
  // Check email
  if (!userEmail) {
    throw Error("email invalid");
  }

  // Check password
  if (!userPassword) {
    throw Error("password invalid");
  }

  // Check if user exist in database
  const checkUser = await User.findOne({ userEmail });

  // Throw error if user not found
  if (!checkUser) {
    throw Error("user not found");
  }

  // Compare hashed password in token vs database
  const checkPassword = await bcrypt.compare(
    userPassword,
    checkUser.userPassword
  );

  // Throw error if password invalid
  if (!checkPassword) {
    throw Error("password invalid");
  }

  let agentValidation = false

  if (isAgent) {
    const checkAgent = await Agent.findOne({ agentUser: checkUser._id })
    if (!checkAgent) {
      throw Error("not an agent")
    }
    agentValidation = true
  }


  // Create new token if email and password correct
  const token = await jwt.sign(
    { _id: checkUser._id, userEmail: checkUser.userEmail },
    secret,
    { expiresIn }
  );

  // Return token to client
  return { token, isAgent: agentValidation };
};

// MUTATION : Update
exports.userUpdate = async (root, { user }, { decoded, receivedToken }) => {

  // Throw error if token not verified
  if (!decoded) {
    throw Error("No access");
  }

  // Extract ID from token
  const { _id } = await decoded;

  // Extract email, password, and new password from request body
  const { userNewEmail, userPassword, userNewPassword } = user;

  // Don't let user change with old password
  if (userNewPassword === userPassword) {
    throw Error("This password already used");
  }

  // Check User & Password
  const checkUser = await User.findById(_id)
    .then(async user => {
      const isMatch = await bcrypt.compare(userPassword, user.userPassword);
      return isMatch;
    })
    .catch(err => {
      throw Error("User not found");
    });
  if (!checkUser) {
    throw Error("Incorrect password");
  }

  // Check New Password Field
  if (userNewPassword) {
    const newPassword = await bcrypt.hash(userNewPassword, saltRounds);
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
        expiresIn
      });
      return { token: newToken };
    });
  }

  // Throw error if new email or new password field empty
  throw Error("Cannot update empty field");
};
