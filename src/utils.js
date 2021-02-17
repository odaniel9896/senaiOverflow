const auth = require("./config/auth.json");
const jwt = require("jsonwebtoken")

const generateToken = (payload) => {
    return jwt.sign(payload, auth.secret,
    {
        expiresIn: "24h",    
    }
    );
}

module.exports = {generateToken}

