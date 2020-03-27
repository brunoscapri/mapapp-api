const mongoose = require("mongoose");
const User = mongoose.model('User');

exports.create = async (data) => {
    var user = new User(data);
    await user.save();
}


exports.get = async (data) => {
    var res = await User.find({}, "name email roles");
    return res;
}