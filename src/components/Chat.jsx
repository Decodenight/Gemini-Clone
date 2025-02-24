import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiMenu2Fill, RiSendPlaneFill, RiMicFill } from 'react-icons/ri';
import { addMessage } from '../store/chatSlice';
import { useGeminiAPI } from '../hooks/useGeminiAPI';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../context/ThemeContext';

function Chat({ isSidebarOpen, setIsSidebarOpen }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chats.currentChat.messages);
  const { generateResponse } = useGeminiAPI();
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

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
      dispatch(
        addMessage({
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
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
                    : `${inputBgColor} ${textColor}`
                }`}
              >
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
          >
            <RiSendPlaneFill size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;