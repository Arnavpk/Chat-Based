import { createWelcomeEmailTemplate } from "../email/emailTemplates.js"
import { resendClient, sender } from "../lib/resend.js"

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Chat App!",
        html: createWelcomeEmailTemplate(name, clientURL)
    })

    if (error) {
        console.error("Error sending welcome email:", error);
        return { success: false, error };
    } else {
        console.log("Welcome email sent successfully:", data);
        return { success: true, data };
    }
}