"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/models/User.ts
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
