import IUrlRepository from '../interfaces/IUrlRepository';
import UrlModel, { IUrl } from '../../models/urlModel';

export default class UrlRepository implements IUrlRepository {
  async create(url: Partial<IUrl>): Promise<IUrl> {
    return UrlModel.create(url);
  }
  async findByShortId(shortId: string): Promise<IUrl | null> {
    return UrlModel.findOne({ shortId });
  }
  async findByUser(userId: string): Promise<IUrl[]> {
    return UrlModel.find({ user: userId }).sort({ createdAt: -1 });
  }
  async incrementVisits(shortId: string): Promise<void> {
    await UrlModel.updateOne({ shortId }, { $inc: { visits: 1 } });
  }
}
