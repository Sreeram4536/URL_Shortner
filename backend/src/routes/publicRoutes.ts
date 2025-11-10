import  express  from 'express';
import UrlRepository from '../repositories/implementations/UrlRepository';
import { UrlService } from '../services/implementations/urlService';
import { UrlController } from '../controllers/implementations/urlController';


const publicRoute = express.Router()

const urlRepository = new UrlRepository();
const urlService = new UrlService(urlRepository);
const urlController = new UrlController(urlService);

publicRoute.get('/s/:shortId', (req, res) => urlController.redirect(req, res));
export default publicRoute