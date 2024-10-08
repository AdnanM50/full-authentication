
import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userID) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
    });
    return token;
}