import { GoogleGenerativeAI } from '@google/generative-ai';

export function useGeminiAPI() {
  // Replace with your actual API key
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  const generateResponse = async (prompt) => {
    try {
      // Check if API key is available
      if (!API_KEY) {
        throw new Error('API_KEY_MISSING');
      }

      // Updated to use the correct model name
      // The error suggests the model name might be incorrect or the API version has changed
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Create a more structured error response
      let errorMessage = 'An unexpected error occurred';
      let errorType = 'UNKNOWN_ERROR';
      
      if (error.message === 'API_KEY_MISSING') {
        errorMessage = 'API key is missing. Please check your environment variables.';
        errorType = 'API_KEY_MISSING';
      } else if (error.message?.includes('API key not valid')) {
        errorMessage = 'Invalid API key. Please check your API key.';
        errorType = 'INVALID_API_KEY';
      } else if (error.message?.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection.';
        errorType = 'NETWORK_ERROR';
      } else if (error.message?.includes('quota')) {
        errorMessage = 'API quota exceeded. Please try again later.';
        errorType = 'QUOTA_EXCEEDED';
      } else if (error.message?.includes('not found') || error.message?.includes('404')) {
        errorMessage = 'Model not found. The API may have changed or the model name is incorrect.';
        errorType = 'MODEL_NOT_FOUND';
      }
      
      // Throw a structured error object
      throw {
        message: errorMessage,
        type: errorType,
        originalError: error
      };
    }
  };

  return { generateResponse };
}
