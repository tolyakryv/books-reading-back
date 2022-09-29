const { User } = require("../../models/user");
const {Session} = require("../../models/Session")

const logout = async (req, res) => {
  const { _id } = req.user;
  const session  = req.session
  
  await Session.findByIdAndDelete(session._id);
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "No Content",
  });
};

module.exports = logout;
