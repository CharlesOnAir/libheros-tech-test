import * as dotenv from 'dotenv';
dotenv.config();

// APP CONFIGURATION
export const APP_PORT = process.env.PORT ?? 3001;
export const APP_DATABASE = process.env.APP_DATABASE;

// JWT CONFIGURATION
export const JWT_SECRET = process.env.JWT_SECRET;
