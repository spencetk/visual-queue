import { Role } from './role';

export class User {
  username: string;
  _id: string; // was _id
  password: string;
  role: Role;
  token?: string;
  courses: string[];
}
