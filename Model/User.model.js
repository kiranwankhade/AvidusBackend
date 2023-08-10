const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    pass:String
},{
    versionKey:false
});

const UserModel = mongoose.model("avidusUser",userSchema);

module.exports = {
    UserModel
}