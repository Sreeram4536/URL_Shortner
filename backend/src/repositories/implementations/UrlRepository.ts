import IUrlRepository from '../interfaces/IUrlRepository';
import  { UrlModel,IUrl } from '../../models/urlModel';

export default class UrlRepository implements IUrlRepository {
  async create(url: Partial<IUrl>): Promise<IUrl> {
    return UrlModel.create(url);
  }
  async findByShortId(shortId: string): Promise<IUrl | null> {
    return UrlModel.findOne({ shortId });
  }
  async findByUser(userId: string, page = 1, limit = 10): Promise<{ items: IUrl[], total: number }> {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      UrlModel.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      UrlModel.countDocuments({ userId })
    ]);
    return { items, total };
  }
  async incrementVisits(shortId: string): Promise<void> {
    await UrlModel.updateOne({ shortId }, { $inc: { visits: 1 } });
  }
}
