interface Config {
  apiBaseUrl: string;
  githubClientId: string;
  githubClientSecret: string;
  facebookClientId: string;
  facebookClientSecret: string;
}

export const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  githubClientId: process.env.GITHUB_ID || "",
  githubClientSecret: process.env.GITHUB_SECRET || "",
  facebookClientId: process.env.FACEBOOK_CLIENT_ID || "",
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
};
