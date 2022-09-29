const queryString = require("query-string");
const axios = require("axios");
const { User } = require("../../models/user");
const {
  JWT_SECRET_KEY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BACKEND_URL,
  FRONTEND_URL,
} = process.env;
const jwt = require("jsonwebtoken");

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BACKEND_URL}/api/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
      },
  });
  
  const existingUser = await User.findOne({ email: userData.data.email });
  
  if (!existingUser) {
   const newUser = await User.create({
   email: userData.data.email,
   name: userData.data.name,
 });
  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(newUser._id, {token});
  return res.redirect(`${FRONTEND_URL}?access_token=${token}`);
  };

  const payload = {
    id: existingUser._id,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(existingUser._id, { token });
  return res.redirect(`${FRONTEND_URL}?access_token=${token}`);
};

module.exports = googleRedirect;
