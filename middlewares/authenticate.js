const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const {Session} =require("../models/Session")
const { RequestError } = require("../helpers");
const { JWT_SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(RequestError(401, "Not authorized"));
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY);
  
    const user = await User.findById(payload.uid);
    if (!user) {
      next(RequestError(401, "Not authorized"));
    }

    const session = await Session.findById(payload.sid);
    if (!session) {
      next(RequestError(401, "Not found this session"));
    }
    req.user = user;
    req.session = session;
    next();
  } catch (error) {
    next(RequestError(401, error.message));
  }
};

module.exports = authenticate;
