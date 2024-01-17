import jwt  from "jsonwebtoken";

export const generateToken = (user) => {
    const payload = {
        dummy_email:"blacklight@blacklight.com"
    };

    const options = {
        expiresIn: '365d', // Set the token expiration time as needed
    };

    return jwt.sign(payload, process.env.AUTH_JWT_SECRET, options);
};
