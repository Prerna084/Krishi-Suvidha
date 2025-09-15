// Chatbot service: talks to backend /api/chatbot
import { post } from "./api";

/**
 * Sends a message to the chatbot backend.
 * @param {Object} params
 * @param {string} params.message - User's message
 * @param {string} [params.language='English'] - Preferred language
 * @param {Object} [params.context] - Optional context (e.g., history)
 * @returns {Promise<{response: string, suggestions?: string[], helpOptions?: Array}>}
 */
export async function sendChatMessage({ message, language = "English", context = {} }) {
  if (!message || !message.trim()) {
    throw new Error("Message is required");
  }
  const data = await post("chatbot", { message, language, context });
  return data;
}
