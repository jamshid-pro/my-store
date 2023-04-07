import {Router} from "express";
import { getRegisterPage, getLoginPage, postRegister, postLogin, logout } from "../controllers/authController.js";

const router = Router();

router.get("/register", getRegisterPage);
router.get("/login", getLoginPage);
router.post("/register", postRegister);
router.post("/login", postLogin);
router.get("/logout", logout);


export default router;