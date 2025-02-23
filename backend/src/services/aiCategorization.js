import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const validCategories = ["Interested", "Meeting Booked", "Not Interested", "Spam", "Out of Office"];

export async function categorizeEmail(emailBody) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Categorize the email into one of the following: Interested, Meeting Booked, Not Interested, Spam, Out of Office. Only return the category name.",
        },
        { role: "user", content: `Email content:\n\n"${emailBody}"\n\nCategory:` },
      ],
      max_tokens: 10,
    });

    let category = response.choices[0]?.message?.content?.trim();

    // Ensure the category is valid, otherwise default to "Not Interested"
    if (!validCategories.includes(category)) {
      category = "Not Interested";
    }

    return category;
  } catch (error) {
    console.error("❌ Error categorizing email:", error);
    return "Not Interested"; // Fallback category to avoid validation errors
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
