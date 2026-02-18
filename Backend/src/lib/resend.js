import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND API key is not defined in environment variables');
}

export const resendClient = new Resend(process.env.RESEND_API_KEY);

export const sender = {
    email: process.env.Email_From,
    name: process.env.Email_From_Name
}