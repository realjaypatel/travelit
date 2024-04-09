import express from "express";
import {verifyToken} from "../middleware/verifyToken.js";
import { Home,Register,Login } from "../controllers/front.controller.js";

const router = express.Router();

router.get("/", Home);
router.get("/register", Register);
router.post("/login", Login);
// router.put("/:id", updatePost);
// router.delete("/:id", deletePost);

export default router;
