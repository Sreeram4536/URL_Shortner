"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRepository_1 = __importDefault(require("../repositories/implementations/UserRepository"));
const authService_1 = require("../services/implementations/authService");
const authController_1 = require("../controllers/implementations/authController");
const authRouter = express_1.default.Router();
const userRepository = new UserRepository_1.default();
const authService = new authService_1.AuthService(userRepository);
const authController = new authController_1.AuthController(authService);
authRouter.post('/register', (req, res) => authController.register(req, res));
authRouter.post('/login', (req, res) => authController.login(req, res));
exports.default = authRouter;
