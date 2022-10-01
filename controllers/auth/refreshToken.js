const jwt = require("jsonwebtoken");
const { RequestError } = require("../../helpers");
const { JWT_SECRET_KEY,
    RefreshTokenSecret,
    TokenLife,
    RefreshTokenLife } = process.env

const { Session } = require("../../models/Session")
const { User } = require("../../models/user");


const refreshToken = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    if (authorization) {
        const [bearer, refreshToken] = authorization.split(" ");
        let payload = {};

        try {
            payload = jwt.verify(refreshToken, RefreshTokenSecret);
        } catch (error) {
            next(RequestError(401, "Not authorized"));
        }
        
        const user = await User.findById(payload.id);
        if (!user) {
            next(RequestError(401, "Not authorized"));
        }

        const session = await Session.findById(payload.sid);
        if (!session) {
            next(RequestError(401, "Not found this session"));
        }

        await Session.findByIdAndDelete(payload.sid);

        const newSession = await Session.create({
            userId: payload.id
        })
        
        const newToken = jwt.sign(payload, JWT_SECRET_KEY);
        const newRefreshToken = jwt.sign(payload, RefreshTokenSecret);
       
        res.json({
            sid: newSession._id,
            newToken,
            newRefreshToken
            
        })
    }
    else {
            throw RequestError(400, "No token provided");
    }
}

module.exports = refreshToken;