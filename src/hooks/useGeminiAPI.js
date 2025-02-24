import { GoogleGenerativeAI } from '@google/generative-ai';

export function useGeminiAPI() {
  // Replace with your actual API key
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  const generateResponse = async (prompt) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  };

  return { generateResponse };
}