import { config } from "@/config";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: config.githubClientId,
      clientSecret: config.githubClientSecret,
    }),
    DiscordProvider({
      clientId: config.discordClientId,
      clientSecret: config.discordClientSecret,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
