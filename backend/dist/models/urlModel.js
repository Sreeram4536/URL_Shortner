"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlModel = void 0;
// backend/src/models/Url.ts
const mongoose_1 = require("mongoose");
const UrlSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
    shortUrl: { type: String, required: true },
    clicks: { type: Number, default: 0 },
}, { timestamps: true });
exports.UrlModel = (0, mongoose_1.model)('Url', UrlSchema);
