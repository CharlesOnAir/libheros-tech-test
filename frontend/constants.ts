import dotenv from "dotenv";
dotenv.config();

// NEXTAUTH CONFIGURATION
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

// AXIOS CONFIGURATION
export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
