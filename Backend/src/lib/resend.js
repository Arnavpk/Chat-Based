import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

export const resendClient = new Resend(process.env.reSEND_API_KEY);

export const sender = {
    email: process.env.Email_From,
    name: process.env.Email_From_Name
}