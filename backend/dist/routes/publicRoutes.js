"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UrlRepository_1 = __importDefault(require("../repositories/implementations/UrlRepository"));
const urlService_1 = require("../services/implementations/urlService");
const urlController_1 = require("../controllers/implementations/urlController");
const publicRoute = express_1.default.Router();
const urlRepository = new UrlRepository_1.default();
const urlService = new urlService_1.UrlService(urlRepository);
const urlController = new urlController_1.UrlController(urlService);
publicRoute.get('/s/:shortId', (req, res) => urlController.redirect(req, res));
exports.default = publicRoute;
