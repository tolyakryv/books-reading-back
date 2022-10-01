const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");


const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email is already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ name, email, password: hashPassword});
  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      id: newUser._id,
    },
  });
};

module.exports = register;
