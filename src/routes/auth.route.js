import express from 'express';
import { signup, login, logout, varifyemail, forgotpassword, resetpassword } from '../controllers/auth.Controller.js';
const router = express.Router();

router.post("/signup", signup);
router.post("/varify-email", varifyemail);
router.post("/forgot-password", forgotpassword);
router.post("/reset-password/:token", resetpassword);

router.post('/login',login);

router.post('/logout', logout);

//  For testing purposes, you can add a GET route
router.get('/signup', (req, res) => {
    res.send('This is a GET request to signup. Use POST to actually sign up.');
});

export default router;
