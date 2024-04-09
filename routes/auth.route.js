import express from "express";
import {register_ejs,login_ejs, login, logout, register } from "../controllers/auth.controller.js";

const router = express.Router();




router.get("/register", register_ejs);
router.get("/login", login_ejs);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
