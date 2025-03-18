import { FilterQuery } from 'mongoose';
import User from '../models/User';
import { IUser, IUserCreate, IUserUpdate, IUserQuery, IUserResult } from '../types/user';

export class UserService {
  static async create(userData: IUserCreate): Promise<IUserResult> {
    const user = new User(userData);
    return {
      user: (await user.save()) as IUser,
    }
  }

  static async findAll(query: IUserQuery): Promise<IUserResult> {
    const { page, limit } = query;

    const baseQuery: FilterQuery<typeof User> = { deleted_at: null };

    if (!page && !limit) {
      const users = await User.find(baseQuery);
      return {
        users: users as IUser[],
      };
    }

    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const [users, total] = await Promise.all([
      User.find(baseQuery)
        .skip(skip)
        .limit(limitNumber),
      User.countDocuments(baseQuery)
    ]);

    return {
      users: users as IUser[],
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        pages: Math.ceil(total / limitNumber),
        hasNextPage: pageNumber < Math.ceil(total / limitNumber),
        hasPrevPage: pageNumber > 1,
      },
    };
  }

  static async findById(id: string): Promise<IUserResult> {
    const user = await User.findOne({
      _id: id,
      deleted_at: null,
    });
    return {
      user: user as IUser,
    };
  }

  static async update(
    id: string,
    userData: IUserUpdate
  ): Promise<IUserResult> {
    const user = await User.findOneAndUpdate(
      { _id: id, deleted_at: null },
      userData,
      { new: true }
    );
    return {
      user: user as IUser,
    };
  }

  static async delete(id: string): Promise<IUserResult> {
    const user = await User.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { deleted_at: new Date() },
      { new: true }
    );
    return {
      user: user as IUser,
    };
  }

  static async findByCity(query: IUserQuery): Promise<IUserResult> {
    const { city, page, limit } = query;

    const baseQuery: FilterQuery<typeof User> = { deleted_at: null };

    if (!page && !limit) {
      const users = await User.find(baseQuery);
      return {
        users: users as IUser[],
      };
    }

    const pageNumber = page || 1;
    const limitNumber = limit || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const [users, total] = await Promise.all([
      User.find(baseQuery)
        .skip(skip)
        .limit(limitNumber),
      User.countDocuments(baseQuery),
    ]);

    return {
      users: users as IUser[],
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        pages: Math.ceil(total / limitNumber),
        hasNextPage: pageNumber < Math.ceil(total / limitNumber),
        hasPrevPage: pageNumber > 1,
      },
    };
  }
}
