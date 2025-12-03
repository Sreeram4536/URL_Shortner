import IUrlRepository from '../interfaces/IUrlRepository';
import { UrlModel, IUrl } from '../../models/urlModel';
import BaseRepository from '../BaseRepository';

export default class UrlRepository extends BaseRepository<IUrl> implements IUrlRepository {
  constructor() {
    super(UrlModel);
  }

  async findByShortId(shortId: string): Promise<IUrl | null> {
    return this.model.findOne({ shortId });
  }

  async findByUser(userId: string, page = 1, limit = 10): Promise<{ items: IUrl[], total: number }> {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.model.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      this.model.countDocuments({ userId })
    ]);
    return { items, total };
  }

  async incrementVisits(shortId: string): Promise<void> {
    await this.model.updateOne({ shortId }, { $inc: { visits: 1 } });
  }
  // other CRUD is via base
}
