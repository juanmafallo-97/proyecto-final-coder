const User = require("../models/User");
const bcrypt = require("bcrypt");

const createHash = (password) => bcrypt.hashSync(password, 10, null);

const registerUser = async (userData) => {
  try {
    const newUser = new User({
      ...userData,
      password: createHash(userData.password),
    });
    await newUser.save();
    return newUser.name;
  } catch (err) {
    throw new Error(`Error guardando el usuario: ${err.message}`);
  }
};

module.exports = { registerUser };
