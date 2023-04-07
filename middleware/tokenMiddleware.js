export default function (req, res, next) {
    console.log(req.cookies.token);
    const isAuth = req.cookies.token ? true: false;
    console.log(isAuth);
    res.locals.token = isAuth;
    next();
}