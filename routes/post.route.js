import express from "express";
import {verifyToken} from "../middleware/verifyToken.js";
import { addPost, deletePost, getPost, getPosts, updatePost ,addPost_ejs} from "../controllers/post.controller.js";

const router = express.Router();
router.get("/addpost", verifyToken, addPost_ejs);
router.get("/getposts", getPosts);
router.get("/getpost/:id", getPost);
router.post("/addpost", verifyToken, addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;
