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
const urlModel_1 = require("../../models/urlModel");
class UrlRepository {
    create(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return urlModel_1.UrlModel.create(url);
        });
    }
    findByShortId(shortId) {
        return __awaiter(this, void 0, void 0, function* () {
            return urlModel_1.UrlModel.findOne({ shortId });
        });
    }
    findByUser(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, page = 1, limit = 10) {
            const skip = (page - 1) * limit;
            const [items, total] = yield Promise.all([
                urlModel_1.UrlModel.find({ userId })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),
                urlModel_1.UrlModel.countDocuments({ userId })
            ]);
            return { items, total };
        });
    }
    incrementVisits(shortId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield urlModel_1.UrlModel.updateOne({ shortId }, { $inc: { visits: 1 } });
        });
    }
}
exports.default = UrlRepository;
