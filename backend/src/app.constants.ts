import * as dotenv from 'dotenv';
dotenv.config();

// APP CONFIGURATION
export const APP_PORT = process.env.PORT ?? 3001;
export const APP_DATABASE = process.env.DATABASE_URL;
// SWAGGER CONFIGURATION
export const SWAGGER_USER = process.env.SWAGGER_USER;
export const SWAGGER_PASSWORD = process.env.SWAGGER_PASSWORD;
// JWT CONFIGURATION
export const JWT_API_SECRET = process.env.JWT_API_SECRET;
