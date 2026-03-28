const mongoose=require("mongoose");
const UsersSchema=require("../schemas/UsersSchema");

const User = mongoose.model("User", UsersSchema);

module.exports=User;