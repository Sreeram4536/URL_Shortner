import express from 'express';

import { UrlService } from '../services/implementations/urlService';
import { UrlController } from '../controllers/implementations/urlController';
import UrlRepository from '../repositories/implementations/UrlRepository';
import { authMiddleware } from '../middleware/authMiddleware';


const urlRouter = express.Router();

const urlRepository = new UrlRepository();
const urlService = new UrlService(urlRepository);
const urlController = new UrlController(urlService);

urlRouter.post('/shorten', authMiddleware, (req, res) => urlController.shortenUrl(req, res));
urlRouter.get('/my-urls', authMiddleware, (req, res) => urlController.getUserUrls(req, res));
urlRouter.get('/:shortId', (req, res) => urlController.redirect(req, res));

export default urlRouter;
