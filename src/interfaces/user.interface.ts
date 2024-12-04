export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  role: string;
}

export enum Role {
  admin = "admin",
  user = "user",
}
