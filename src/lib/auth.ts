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
      async authorize(credentials, request) {
        try {
          const email = credentials?.email as string | undefined;
          const password = credentials?.password as string | undefined;

          if (!email || !password) {
            console.error("Missing credentials");
            throw new Error("Missing credentials");
          }

          await dbConnect();
          console.log("DB connected successfully");

          const user = await UserModel.findOne({
            email,
          }).select("+password");

          if (!user) {
            console.error("User not found");
            throw new Error("Invalid credentials");
          }

          const isPasswordValid = await compare(password, user.password);

          if (!isPasswordValid) {
            console.error("Invalid password");
            throw new Error("Invalid credentials");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            image: user.profilePicture || null,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
});
