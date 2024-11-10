export const runtime = "nodejs";

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import UserModel from "@/models/User";
import dbConnect from "@/lib/mongoose";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Missing credentials");
        }

        await dbConnect();
        const user = await UserModel.findOne({
          email: credentials.email,
        }).select("+password");

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          image: user.profilePicture || null,
        };
      },
    }),
  ],
});
