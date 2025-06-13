import "next-auth";

declare module "next-auth" {
  interface User {
    accessToken?: string;
  }
  interface Session {
    user: {
      id: string;
      name: string;
      image: string;
      token: string;
      email: string;
    };
  }
}
