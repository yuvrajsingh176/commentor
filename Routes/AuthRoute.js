import express from 'express';
import { Login, Logout, Register } from '../Controller/authController.js';
const router = express.Router();

router.route('/register').post(Register);
router.route('/login').post(Login);
router.get('/logout', Logout);

export default router;