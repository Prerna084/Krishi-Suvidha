import React, { useEffect, useRef, useState } from "react";
import { sendChatMessage } from "../services/chatbotService";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello! I’m your Krishi Assistant. Ask me about weather, crop advice, market prices, government schemes, water availability, disease alerts and more." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(text) {
    const content = (text ?? input).trim();
    if (!content) return;

    const userMsg = { role: "user", text: content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setSuggestions([]);

    try {
      // Optional basic context can be extended with geo, last intent, etc.
      const context = {
        lastMessages: messages.slice(-6).map((m) => ({ role: m.role, text: m.text })),
      };

      const result = await sendChatMessage({ message: content, language: "English", context });
      const botText = typeof result?.response === "string" ? result.response : "I have recorded your query.";
      const botMsg = { role: "bot", text: botText };
      setMessages((prev) => [...prev, botMsg]);

      if (Array.isArray(result?.suggestions)) {
        setSuggestions(result.suggestions.slice(0, 6));
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I could not process that request right now. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-160px)] bg-white">
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-green-800">Krishi Assistant</h1>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-[60vh] overflow-y-auto">
          {messages.map((m, idx) => (
            <div key={idx} className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-3 py-2 rounded-lg text-sm shadow-sm ${
                  m.role === "user" ? "bg-green-600 text-white" : "bg-white text-gray-800"
                }`}
                style={{ maxWidth: "85%" }}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-sm text-gray-500">Typing...</div>
          )}
          <div ref={bottomRef} />
        </div>

        {suggestions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                className="text-xs bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full"
                onClick={() => handleSend(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <input
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Type your question... e.g., Weather in Amritsar, Crop advice for Rabi, Market price for Wheat"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            disabled={loading}
          />
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg"
            onClick={() => handleSend()}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
