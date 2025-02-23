import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Pinecone and OpenAI
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Select Pinecone index
const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

// Function to generate embeddings
async function generateEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  return response.data[0].embedding;
}

// Store outreach agenda & product details in Pinecone
export async function storeTrainingData(id, text) {
  try {
    const vector = await generateEmbedding(text);
    await index.upsert([{ id, values: vector, metadata: { text } }]);
    console.log(`✅ Stored training data: ${text}`);
  } catch (error) {
    console.error("❌ Error storing training data:", error);
  }
}

// Retrieve similar data from Pinecone
export async function retrieveRelevantData(query) {
  try {
    const queryVector = await generateEmbedding(query);
    const result = await index.query({ vector: queryVector, topK: 3, includeMetadata: true });

    if (result.matches.length > 0) {
      return result.matches.map((match) => match.metadata.text).join("\n");
    }
    return "";
  } catch (error) {
    console.error("❌ Error retrieving data:", error);
    return "";
  }
}
