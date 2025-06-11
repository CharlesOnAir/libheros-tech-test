import * as dotenv from 'dotenv';
dotenv.config();

export const APP_PORT = process.env.PORT ?? 3001;
export const APP_DATABASE = process.env.APP_DATABASE;
