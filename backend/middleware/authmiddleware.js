const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

function authMiddleware (req, res, next) {
    const authHeader = req.body.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "403 Error"
        })
    };

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.decode({
            token
        }, process.env.JWT_SECRET)

    } catch(err) {
       return res.status(403).json({})
    }
}

module.exports = {
    authMiddleware
}