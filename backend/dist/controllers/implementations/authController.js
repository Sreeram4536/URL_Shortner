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
const authValidator_1 = require("../../validators/authValidator");
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    //   async register(req: Request, res: Response): Promise<void> {
    //     try {
    //       const { name, email, password } = req.body;
    //       if (!name || !email || !password) {
    //         res.status(400).json({ message: 'All fields are required' });
    //         return;
    //       }
    //       const user = await this.authService.register(name, email, password);
    //       res.status(201).json({ message: 'User registered successfully', user });
    //     } catch (error: any) {
    //       res.status(400).json({ message: error.message || 'Registration failed' });
    //     }
    //   }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate request body
            const parsed = authValidator_1.signupSchema.safeParse(req.body);
            if (!parsed.success) {
                // Zod errors are in parsed.error.issues
                res.status(400).json({ errors: parsed.error.issues });
                return;
            }
            const { name, email, password } = parsed.data;
            try {
                const { user, token } = yield this.authService.register(name, email, password);
                res.status(201).json({ message: 'User registered successfully', user, token });
            }
            catch (error) {
                res.status(400).json({ message: error.message || 'Registration failed' });
            }
        });
    }
    //   async login(req: Request, res: Response): Promise<void> {
    //     try {
    //       const { email, password } = req.body;
    //       if (!email || !password) {
    //         res.status(400).json({ message: 'Email and password are required' });
    //         return;
    //       }
    //       const { user, token } = await this.authService.login(email, password);
    //       res.status(200).json({ message: 'Login successful', user, token });
    //     } catch (error: any) {
    //       res.status(401).json({ message: error.message || 'Login failed' });
    //     }
    //   }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate request body
            const parsed = authValidator_1.signinSchema.safeParse(req.body);
            if (!parsed.success) {
                res.status(400).json({ errors: parsed.error.issues });
                return;
            }
            const { email, password } = parsed.data;
            try {
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
