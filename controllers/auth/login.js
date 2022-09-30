const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {Session}=require("../../models/Session")

const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const { JWT_SECRET_KEY, TokenLife, RefreshTokenSecret, RefreshTokenLife } = process.env;

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

   const newSession = await Session.create({
    userId:user._id
   })
  
  const payload = {
    id: user._id,
    sid: newSession._id
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: TokenLife });
  const refreshToken = jwt.sign(payload, RefreshTokenSecret, { expiresIn: RefreshTokenLife });
  
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    refreshToken,
    sid:newSession._id,
    user: {
      email,
    },
  });
};

module.exports = login;
