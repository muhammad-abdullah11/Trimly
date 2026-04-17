import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      fullName: string;
      name?: string;
      username?: string;
      profilePicture?: string;
      image?: string;
      type: string;
    };
  }

  interface User {
    id: string;
    email: string;
    fullName: string;
    name?: string;
    username?: string;
    profilePicture?: string;
    image?: string;
    type: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    fullName: string;
    username?: string;
    profilePicture?: string;
    type: string;
  }
}