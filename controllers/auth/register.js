const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Session } = require("../../models/Session");
const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const { JWT_SECRET_KEY, TokenLife, RefreshTokenSecret, RefreshTokenLife } =  process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email is already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashPassword });
  const newSession = await Session.create({
    userId: newUser._id,
  });

  const payload = {
    id: newUser._id,
    sid: newSession._id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: TokenLife });
  const refreshToken = jwt.sign(payload, RefreshTokenSecret, {
    expiresIn: RefreshTokenLife,
  });

  await User.findByIdAndUpdate(newUser._id, { token });
  res.status(201).json({
    token,
    refreshToken,
    sid: newSession._id,
    user: {
      name: newUser.name,
      email: newUser.email,
      id: newUser._id,
    },
  });
};

module.exports = register;
