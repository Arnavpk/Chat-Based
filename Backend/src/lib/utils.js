import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

//user clicks on login/signup button
//trigger the respective API call to backend
//request to api/auth/login or api/auth/signup
//creates a user in database (for signup) or checks user credentials (for login)
//generates a JWT token and sends it back to frontend
//frontend stores the token in localStorage or cookies

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
        maxage: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
        httpOnly: true, //prevents client-side JavaScript from accessing the cookie
        samesite: 'strict', //CSFR protection
        secure: process.env.NODE_ENV === 'development' ? false : true
    });

    return token;
}