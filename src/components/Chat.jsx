import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiMenu2Fill, RiSendPlaneFill, RiMicFill, RiErrorWarningLine } from 'react-icons/ri';
import { addMessage } from '../store/chatSlice';
import { useGeminiAPI } from '../hooks/useGeminiAPI';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../context/ThemeContext';

function Chat({ isSidebarOpen, setIsSidebarOpen }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chats.currentChat.messages);
  const { generateResponse } = useGeminiAPI();
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Clear any previous errors
    setError(null);
    
    const userMessage = { role: "user", content: input };
    dispatch(addMessage(userMessage));
    setInput("");
    setIsLoading(true);

    try {
      const response = await generateResponse(input);
      const aiMessage = { role: "assistant", content: response };
      dispatch(addMessage(aiMessage));
    } catch (error) {
      console.error("Error generating response:", error);
      
      // Store the error for UI display
      setError(error);
      
      // Add a more specific error message based on the error type
      let errorMessage = "Sorry, I encountered an error. Please try again.";
      
      if (error.type === 'API_KEY_MISSING') {
        errorMessage = "API key is missing. Please check your environment configuration.";
      } else if (error.type === 'INVALID_API_KEY') {
        errorMessage = "Invalid API key. Please check your API key configuration.";
      } else if (error.type === 'NETWORK_ERROR') {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (error.type === 'QUOTA_EXCEEDED') {
        errorMessage = "API quota exceeded. Please try again later.";
      } else if (error.type === 'MODEL_NOT_FOUND') {
        errorMessage = "The AI model could not be found. This may be due to API changes or an incorrect model name.";
      }
      
      dispatch(
        addMessage({
          role: "assistant",
          content: errorMessage,
          isError: true
        })
      );
    }

    setIsLoading(false);
  };

  const bgColor = isDark ? "bg-gemini-dark" : "bg-gemini-dark-light";
  const textColor = isDark ? "text-white" : "text-black";
  const borderColor = isDark ? "border-white/10" : "border-black/10";
  const inputBgColor = isDark ? "bg-gemini-gray" : "bg-gemini-gray-light";

  return (
    <div className={`flex-1 flex flex-col h-screen ${bgColor} ${textColor}`}>
      <header className={`h-16 flex items-center px-4 border-b ${borderColor}`}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-full"
          aria-label="Toggle sidebar"
        >
          <RiMenu2Fill size={24} />
        </button>
        <div className="ml-4 font-semibold">Gemini Clone</div>
      </header>

      <main className="flex-1 overflow-y-auto p-2 md:p-4 space-y-4 md:space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-blue-400">Hello</span>,{" "}
              <span className="text-pink-400">User</span>
            </h1>
            <p className="text-lg text-gray-400">How can I help you today?</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] md:max-w-[80%] rounded-lg p-3 md:p-4 ${
                  message.role === "user"
                    ? "bg-gemini-blue text-white"
                    : `${inputBgColor} ${textColor} ${message.isError ? "border border-red-500" : ""}`
                }`}
              >
                {message.isError && (
                  <div className="flex items-center gap-2 text-red-500 mb-2">
                    <RiErrorWarningLine />
                    <span className="font-medium">Error</span>
                  </div>
                )}
                <ReactMarkdown className="prose prose-invert max-w-none text-sm md:text-base">
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div
              className={`${inputBgColor} ${textColor} rounded-lg p-3 md:p-4`}
            >
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </main>

      <form
        onSubmit={handleSubmit}
        className={`p-2 md:p-4 border-t ${borderColor}`}
      >
        <div
          className={`flex items-center gap-2 ${inputBgColor} rounded-xl p-2`}
        >
          <button
            type="button"
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Voice input"
          >
            <RiMicFill size={20} />
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Gemini..."
            className={`flex-1  bg-transparent outline-none text-sm md:text-base ${
              isDark
                ? "placeholder-white/50"
                : "placeholder-black/50"
            }`}
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 hover:bg-white/10 rounded-full disabled:opacity-50 transition-colors"
            aria-label="Send message"
          >
            <RiSendPlaneFill size={20} />
          </button>
        </div>
        
        {error && (
          <div className="mt-2 text-xs text-red-500">
            {error.type === 'API_KEY_MISSING' && (
              <p>Please add your API key to the .env file as VITE_GEMINI_API_KEY</p>
            )}
            {error.type === 'INVALID_API_KEY' && (
              <p>Your API key appears to be invalid. Please check it in the .env file.</p>
            )}
            {error.type === 'MODEL_NOT_FOUND' && (
              <p>The model name may have changed. Check the useGeminiAPI.js file for the latest model name.</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default Chat;
