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
exports.UrlController = void 0;
class UrlController {
    constructor(urlService) {
        this.urlService = urlService;
    }
    shortenUrl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { originalUrl } = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // from JWT middleware
                const data = yield this.urlService.shortenUrl(originalUrl, userId);
                res.status(201).json(data);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    getUserUrls(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const urls = yield this.urlService.getUserUrls(userId);
                res.status(200).json(urls);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    redirect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { shortId } = req.params;
                const originalUrl = yield this.urlService.getOriginalUrl(shortId);
                if (!originalUrl) {
                    res.status(404).send('URL not found');
                    return;
                }
                res.redirect(originalUrl);
            }
            catch (error) {
                res.status(500).send('Server error');
            }
        });
    }
}
exports.UrlController = UrlController;
