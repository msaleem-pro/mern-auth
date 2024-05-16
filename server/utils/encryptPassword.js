const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
  const salt = 10;
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (newPassword, oldPassowrd) => {
  return bcrypt.compare(newPassword, oldPassowrd);
};
module.exports = { hashPassword, comparePassword };
