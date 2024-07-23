const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

function authMiddleware (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "403 Error"
        })
    };

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;
        next();
        
    } catch(err) {
       return res.status(403).json({})
    }
}

module.exports = {
    authMiddleware
}