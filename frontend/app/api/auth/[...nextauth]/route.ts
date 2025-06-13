import { NEXTAUTH_SECRET } from "@/constants";
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Missing email or password");
        try {
          const response = await axios({
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_API_URL}/authentification/login`,
            data: credentials,
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.status !== 200 && response.status !== 201)
            throw new Error(`Invalid credentials ${response.status}`);
          const user = await response.data;

          if (!user || !user.access_token) {
            throw new Error("Invalid response from server");
          }

          return {
            id: user.id,
            email: user.email,
            accessToken: user.access_token,
          };
        } catch (error) {
          throw new Error(`${error}`);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.email = token.email!;
          session.user.token = token.accessToken as string;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
  pages: {
    signIn: "/authentification/login",
  },
  secret: NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
