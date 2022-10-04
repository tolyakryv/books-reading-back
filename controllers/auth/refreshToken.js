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
        let newPayload = {};
        let payload ={}

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
        
        newPayload = {
            id: payload.id,
            sid:newSession._id
        }
        const newToken = jwt.sign(newPayload, JWT_SECRET_KEY,{expiresIn:"1h"});
        const newRefreshToken = jwt.sign(newPayload, RefreshTokenSecret,{expiresIn:'2h'});
        
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