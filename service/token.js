import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    const accessToken = jwt.sign({userId}, process.env.JWT_KEY, {expiresIn: "30d"});
    
    return accessToken;
}

export {generateToken};