import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function categorizeEmail(emailBody) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: "Categorize the email into one of the following: Interested, Meeting Booked, Not Interested, Spam, Out of Office." },
                { role: 'user', content: `Email content:\n\n"${emailBody}"\n\nCategory:` }
            ],
            max_tokens: 10,
        });

        return response.choices[0]?.message?.content?.trim() || "Unknown";
    } catch (error) {
        console.error("Error categorizing email:", error);
        return "Unknown";
    }
}

export async function suggestReply(emailBody) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // Use this model if GPT-4 isn't available
            messages: [
                { role: 'system', content: "Generate a professional reply based on the given email." },
                { role: 'user', content: `Email content:\n\n"${emailBody}"\n\nSuggested reply:` }
            ],
            max_tokens: 10,
        });

        return response.choices[0]?.message?.content?.trim() || "No reply generated.";
    } catch (error) {
        console.error("Error suggesting reply:", error);
        return "No reply generated.";
    }}
