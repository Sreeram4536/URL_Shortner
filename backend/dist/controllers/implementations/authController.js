"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                if (!name || !email || !password) {
                    res.status(400).json({ message: 'All fields are required' });
                    return;
                }
                const user = yield this.authService.register(name, email, password);
                res.status(201).json({ message: 'User registered successfully', user });
            }
            catch (error) {
                res.status(400).json({ message: error.message || 'Registration failed' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({ message: 'Email and password are required' });
                    return;
                }
                const { user, token } = yield this.authService.login(email, password);
                res.status(200).json({ message: 'Login successful', user, token });
            }
            catch (error) {
                res.status(401).json({ message: error.message || 'Login failed' });
            }
        });
    }
}
exports.AuthController = AuthController;
