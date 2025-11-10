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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_mapper_1 = require("../../mapper/user.mapper");
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    register(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepository.findByEmail(email);
            if (existingUser)
                throw new Error('User already exists');
            const hashed = yield bcryptjs_1.default.hash(password, 10);
            const newUser = yield this.userRepository.create({ name, email, password: hashed });
            const token = jsonwebtoken_1.default.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
            return { user: user_mapper_1.UserMapper.toUserDTO(newUser), token }; // ✅ map to DTO
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            if (!user)
                throw new Error('Invalid credentials');
            const valid = yield bcryptjs_1.default.compare(password, user.password);
            if (!valid)
                throw new Error('Invalid credentials');
            const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
            return { user: user_mapper_1.UserMapper.toUserDTO(user), token }; // ✅ clean data returned
        });
    }
}
exports.AuthService = AuthService;
