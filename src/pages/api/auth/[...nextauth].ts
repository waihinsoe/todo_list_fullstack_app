import { config } from "@/config";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: config.githubClientId,
      clientSecret: config.githubClientSecret,
    }),
    FacebookProvider({
      clientId: config.facebookClientId,
      clientSecret: config.facebookClientSecret,
    }),

    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
