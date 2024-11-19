import { DefaultSession } from "next-auth";
declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  // interface User{
  //   role: string;
  //   id: string;
  //   isActive:boolean;
  // }
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      emailVerified: Date | null;
      image?: string;
      name: string;
      role: string;
    }
  }
}


// The `JWT` interface can be found in the `next-auth/jwt` submodule
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
  }
}
