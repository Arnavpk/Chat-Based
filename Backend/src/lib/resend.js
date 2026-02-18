import { Resend } from "resend";

let resendClient;

export const getResendClient = () => {
    if (!resendClient) {
        if (!process.env.RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY is missing");
        }

        resendClient = new Resend(process.env.RESEND_API_KEY);
    }

    return resendClient;
};

export const sender = {
    email: process.env.EMAIL_FROM,
    name: process.env.EMAIL_FROM_NAME,
};
