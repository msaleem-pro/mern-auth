const jwt = require("jsonwebtoken");
const KEY = process.env.KEY;
const sign = (payload) => {
  return jwt.sign(payload, KEY, { expiresIn: 1800 });
};
module.exports = { sign };
