const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        req.auth = {
            userId: userId,
            role: role,
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};
