import express from 'express';
import { loginUser, registerUser } from '../controlers/User.js';




const router = express.Router();

router.post('/register',registerUser);
router.post('/login', loginUser);

export default router;
