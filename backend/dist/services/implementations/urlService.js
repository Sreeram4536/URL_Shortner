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
exports.UrlService = void 0;
const shortid_1 = __importDefault(require("shortid"));
const url_mapper_1 = require("../../mapper/url.mapper");
const mongoose_1 = require("mongoose");
class UrlService {
    constructor(urlRepository) {
        this.urlRepository = urlRepository;
    }
    shortenUrl(originalUrl, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const shortId = shortid_1.default.generate();
            const shortUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/s/${shortId}`;
            const url = yield this.urlRepository.create({
                originalUrl,
                shortId,
                shortUrl,
                userId: new mongoose_1.Types.ObjectId(userId),
            });
            return url_mapper_1.UrlMapper.toUrlDTO(url);
        });
    }
    getUserUrls(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, page = 1, limit = 10) {
            const { items, total } = yield this.urlRepository.findByUser(userId, page, limit);
            return { items: items.map(url_mapper_1.UrlMapper.toUrlDTO), total };
        });
    }
    getOriginalUrl(shortId) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = yield this.urlRepository.findByShortId(shortId);
            if (!url)
                return null;
            yield this.urlRepository.incrementVisits(shortId);
            return url.originalUrl;
        });
    }
}
exports.UrlService = UrlService;
