import { config } from 'dotenv';

// Config from dotenv
config();

export const MONGODB_URL = process.env.MONGODB_URL || '';
export const PORT = process.env.PORT || '';
