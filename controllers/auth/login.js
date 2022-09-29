const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const { JWT_SECRET_KEY, JWT_TIME } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email is wrong");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
   if (!comparePassword) {
    throw RequestError(401, "Password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_TIME });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: {
      email,
    },
  });
};

module.exports = login;
