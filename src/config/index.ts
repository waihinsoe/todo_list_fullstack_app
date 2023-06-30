interface Config {
  apiBaseUrl: string;
  githubClientId: string;
  githubClientSecret: string;
  discordClientId: string;
  discordClientSecret: string;
}

export const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  githubClientId: process.env.GITHUB_ID || "",
  githubClientSecret: process.env.GITHUB_SECRET || "",
  discordClientId: process.env.DISCORD_CLIENT_ID || "",
  discordClientSecret: process.env.DISCORD_CLIENT_SECRET || "",
};
