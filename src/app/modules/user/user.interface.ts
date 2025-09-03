// common/types.ts
export enum IRole {
  customer = "customer",
  seller = "seller",
  admin = "admin",
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  userImage: string;
  phoneNumber: string;
  role: IRole;
  isVerified?: boolean;
}
