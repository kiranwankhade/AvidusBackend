const express = require("express");

const { UserModel } = require("../Model/User.model");

const userRouter = express.Router();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { checkBlacklist } = require("../Middleware/checktoken.middleware");

let tokenBlacklist = [];

userRouter.get("/", async(req, res) => {
  let retrieve = await UserModel.find();
  res.send(retrieve)
});

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  console.log('req.body:', req.body)
  
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: 'User already exists' });
  }else{
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
          if (err) {
            console.log("err Bcrypt", err);
          }
          const user = new UserModel({ name, email, pass: hash });
          console.log('user:', user)
          await user.save();
          res.status(200).send({ message: "registration successful" });
        });
      } catch (err) {
        res.send("Error in registering the user");
        // console.log(err)
      }
  }

  
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  // console.log('req.body:', req.body)
  try {
    const user = await UserModel.find({ email });
    // console.log('user:', user)


    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, function (err, result) {
        console.log('result:', result)
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");
          res.send({ msg: "Login Successfully", token: token });
        } else {
          res.send("Wrong Credentials");
        }
      });
    } else {
      res.send("Wrong Credentials");
    }
  } catch (err) {
    res.send("Something went wrong");
    console.log(err);
  }
});

// userRouter.use(checkBlacklist);

userRouter.post("/logout", async (req, res) => {
  const token = req.body.token;

  const decoded = jwt.verify(token, "masai");
  console.log('decoded:', decoded)
  const userId = decoded.userID;
  console.log('userId:', userId)

  await UserModel.findByIdAndDelete(userId);

  tokenBlacklist.push(token);
  res.send("LogOut Successfully");
});



module.exports = {
  userRouter,
};
