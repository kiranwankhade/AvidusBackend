//middlwares/authenticate.middleware.js
const jwt=require("jsonwebtoken")
const authenticate = (req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.user = decoded.userID;
                next()
            } else {
                res.send("Please Login")
            }
        })
    } else {
        res.send("Please Login")
    }
}


// const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) return res.status(401).json({ msg: "No authentication token, access denied." });

    try {
        const verified = jwt.verify(token, "masai");
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ msg: "Token verification failed, access denied." });
    }
};

module.exports={
    authenticate,
    auth
}