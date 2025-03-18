import User from '../models/User';
import { IUser, IUserCreate, IUserUpdate, IUserQuery } from '../types/user';

export class UserService {
  static async create(userData: IUserCreate): Promise<IUser> {
    const user = new User(userData);
    return (await user.save()) as IUser;
  }

  static async findAll(query: IUserQuery) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find({ deleted_at: null }).skip(skip).limit(limit),
      User.countDocuments({ deleted_at: null }),
    ]);

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  static async findById(id: string): Promise<IUser | null> {
    return await User.findOne({
      _id: id,
      deleted_at: null,
    });
  }

  static async update(
    id: string,
    userData: IUserUpdate
  ): Promise<IUser | null> {
    return await User.findOneAndUpdate(
      { _id: id, deleted_at: null },
      userData,
      { new: true }
    );
  }

  static async delete(id: string): Promise<IUser | null> {
    return await User.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { deleted_at: new Date() },
      { new: true }
    );
  }

  static async findByCity(query: IUserQuery) {
    const { city, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find({
        deleted_at: null,
        'addresses.city': { $regex: new RegExp(city!, 'i') },
      })
        .skip(skip)
        .limit(limit),
      User.countDocuments({
        deleted_at: null,
        'addresses.city': { $regex: new RegExp(city!, 'i') },
      }),
    ]);

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  }
}
