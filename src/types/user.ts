export interface IAddress {
  street: string;
  city: string;
  country: string;
  postal_code: string;
}

export interface IUser {
  name: string;
  email: string;
  age?: number;
  created_at: Date;
  deleted_at?: Date | null;
  addresses: IAddress[];
}

export interface IUserCreate extends Omit<IUser, 'created_at' | 'deleted_at'> {}

export interface IUserUpdate extends Partial<IUserCreate> {}

export interface IUserQuery {
  page?: number;
  limit?: number;
  city?: string;
}
