import NextAuth from "next-auth";
import { z } from "zod";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import brcyptjs from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log({ credentials });
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
          console.log(parsedCredentials);
        if (!parsedCredentials.success) return null;
       
        const { email, password } = parsedCredentials.data;

        // Search user by email
        const user = await prisma.user.findUnique({
          where: { email: email.toLocaleLowerCase() },
        });

        // Check user
        if (!user) return null;

        // Check if password is correct
        if (!brcyptjs.compareSync(password, user.password)) return null;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = user;
        console.log({userWithoutPassword});
        return userWithoutPassword;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/register",
  },
});
