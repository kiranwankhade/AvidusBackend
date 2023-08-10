

function checkBlacklist(req, res, next) {
    const token = req.headers.authorization;
    if (tokenBlacklist.includes(token)) {
        return res.sendStatus(401);  // Unauthorized
    }
    next();
}


module.exports = {
    checkBlacklist
}