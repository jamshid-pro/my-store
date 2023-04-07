import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../service/token.js";

const existToken = (req, res) => {
    if(req.cookies.token) {
        res.redirect("/");
        return
    }
} 

//=================== Get Regsiter page
const getRegisterPage = (req, res) => {
    existToken(req, res);
    res.render("register", {
        title: "Register",
        isRegister: true,
        registerError: req.flash("registerError"),
    });
};

//================== Get Login Page
const getLoginPage = (req, res) => {
    existToken(req, res);
    res.render("login", {
        title: "Login",
        isLogin: true,
        loginError: req.flash("loginError"),
    });
};

//================ Register POST Conteroller
const postRegister = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
        req.flash("registerError", "All fields required");
        res.redirect("/register");
        return;
    }

    const condidate = await User.findOne({ email });
    if (condidate) {
        req.flash("registerError", "User already exist");
        res.redirect("/register");
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: hashedPassword,
    };
    const user = await User.create(userData);
    const token = generateToken(user._id);
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.redirect("/");
};

//==================== Login POST Controller
const postLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        req.flash("loginError", "All fields required");
        res.redirect("/login");
        return;
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
        req.flash("loginError", "User not found");
        res.redirect("/login");
        return;
    }

    const isPasswdEqual = await bcrypt.compare(password, existUser.password);
    if (!isPasswdEqual) {
        req.flash("loginError", "Password wrong");
        res.redirect("/login");
        return;
    }

    const token = generateToken(existUser._id);
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.redirect("/");
};



// Logout
const logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
}

export { getRegisterPage, getLoginPage, postRegister, postLogin, logout };
