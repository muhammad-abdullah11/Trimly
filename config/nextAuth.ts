import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DbConnect } from "./mongodb";
import User from "@/Models/user.model";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error(JSON.stringify({ message: "Email and password are required" }));
        }

        await DbConnect();

        const user = await User.findOne({ email: credentials.email }).select("+password");

        if (!user) {
          throw new Error(JSON.stringify({ message: "Invalid email or password" }));
        }

        if (user.isVerified !== true) {
          throw new Error(JSON.stringify({ message: "Please verify your email before logging in" }));
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error(JSON.stringify({ message: "Invalid email or password" }));
        }

        return {
          id: user._id.toString(),
          email: user.email,
          fullName: user.fullName,
          type: user.type
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.fullName = user.fullName;
        token.type = user.type;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.fullName = token.fullName as string;
        session.user.type = token.type as string;
      }
      return session;
    }
  },

  session: {
    strategy: "jwt"
  },

  pages: {
    signIn: "/login"
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default nextAuthOptions;