import express from 'express';
import UserRepository from '../repositories/implementations/UserRepository';
import { AuthService } from '../services/implementations/authService';
import { AuthController } from '../controllers/implementations/authController';


const authRouter = express.Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRouter.post('/register', (req, res) => authController.register(req, res));
authRouter.post('/login', (req, res) => authController.login(req, res));

export default authRouter;
