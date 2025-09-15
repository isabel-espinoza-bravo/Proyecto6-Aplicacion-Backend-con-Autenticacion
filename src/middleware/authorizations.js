const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    let {authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: "No autorizado, token no provisto" });
    try {
        let [type, token] = authorization.split(" ");
        if (type !== "token" || type !== "Bearer") {
            const openToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = openToken;
        next();
        } else {
            return res.status(401).json({ message: "No autorizado, formato de token inválido" });
        }
    } catch (error) {
        res.json({ message: "No autorizado, token inválido", error: error.message });
    }
}