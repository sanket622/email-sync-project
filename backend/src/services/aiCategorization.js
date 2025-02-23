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
    // Retrieve relevant context from Pinecone
    const relevantData = await retrieveRelevantData(emailBody);

    // Create AI prompt with relevant data
    const prompt = `
      You are an AI assistant generating professional email replies.
      Use the relevant context to craft a thoughtful response.

      Relevant Context:
      ${relevantData}

      Email Received:
      "${emailBody}"

      Suggested Reply:
    `;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 100,
    });

    return response.choices[0]?.message?.content?.trim() || "No reply generated.";
  } catch (error) {
    console.error("❌ Error suggesting reply:", error);
    return "No reply generated.";
  }
}

