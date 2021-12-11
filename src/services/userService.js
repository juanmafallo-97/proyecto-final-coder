const bcrypt = require("bcrypt");
const { sendNewUserNotification } = require("../utils/nodemailer");
const User = require("../models/User");

const createHash = (password) => bcrypt.hashSync(password, 10, null);

const registerUser = async (userData) => {
  try {
    const newUser = new User({
      ...userData,
      password: createHash(userData.password)
    });
    await newUser.save();
    sendNewUserNotification(newUser);
    return { name: newUser.name, email: newUser.email, age: newUser.age };
  } catch (err) {
    throw new Error(`Error guardando el usuario: ${err.message}`);
  }
};

module.exports = { registerUser };
