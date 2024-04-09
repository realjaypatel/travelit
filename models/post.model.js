const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const postSchema = new mongoose.Schema({





  title: { type: String },
  price:{type:Number},
  images: [{ type: String }],
  address:{ type: String },
  city:{type:String},
  bedroom:{type:Number},
  bathroom:{type:Number},
  latitude:{type:String},
  longitude:{type:String},
  type:{ type: mongoose.Schema.Types.ObjectId, ref: "type", required: false },
  property:{ type: mongoose.Schema.Types.ObjectId, ref: "property", required: false },
  timestamps: true,
  user:{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: false },
  userId:{type:String},
  postDetail: { type: mongoose.Schema.Types.ObjectId, ref: "postdetail", required: false },
  savedPosts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "savedpost", required: false }
  ]
 





});


module.exports = mongoose.model("post", postSchema);
