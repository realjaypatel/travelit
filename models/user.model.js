const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: { type: String},
  email: { type: String ,unique:true },
  password: { type: String },
  avatar: { type: String},
  about: { type: String},

  posts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "post", required: false },
  ],
  savedPosts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "savedpost", required: false },
  ],
  chats: [
    { type: mongoose.Schema.Types.ObjectId, ref: "chat", required: false },
  ],
  chatIDs: { type: String},



});


module.exports = mongoose.model("user", userSchema);
