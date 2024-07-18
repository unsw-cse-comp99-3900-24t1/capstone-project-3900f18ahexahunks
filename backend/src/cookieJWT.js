const jwt = require('jsonwebtoken');

exports.cookieJWT = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next()
    } catch (error) {
        res.clearCookie("token");
        return res.redirect("/")
    }
}
