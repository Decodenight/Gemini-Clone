import { useState, useEffect, useRef } from 'react';
import { RiChat1Line, RiSettings4Line, RiQuestionLine, RiHistoryLine, RiSunLine, RiMoonLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { newChat } from '../store/chatSlice';
import { useTheme } from '../context/ThemeContext';

function Sidebar({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chats.conversations);
  const [showSettings, setShowSettings] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNewChat = () => {
    dispatch(newChat());
    setIsOpen(false);
  };

  return (
    <div className="h-screen w-[280px] md:w-80 bg-gemini-gray flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-5">Gemini Clone</h1>
        <button 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          onClick={handleNewChat}
        >
          <RiChat1Line />
          <span>New chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.length > 0 && (
          <>
            <div className="px-4 py-2 text-sm text-gray-400">Recent</div>
            {chats.map((chat, index) => (
              <div 
                key={index} 
                className="px-4 py-2 hover:bg-white/10 cursor-pointer truncate"
                title={chat.title}
              >
                {chat.title}
              </div>
            ))}
          </>
        )}
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-2 hover:bg-white/10 cursor-pointer">
          <RiHistoryLine />
          <span>Activity</span>
        </div>
        <div 
          ref={settingsRef}
          className="flex items-center gap-3 px-4 py-2 hover:bg-white/10 cursor-pointer relative"
          onClick={() => setShowSettings(!showSettings)}
        >
          <RiSettings4Line />
          <span>Settings</span>
          {showSettings && (
            <div className="absolute left-0 bottom-full w-full bg-gemini-gray border border-white/10 rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTheme();
                }}
              >
                {isDark ? <RiMoonLine /> : <RiSunLine />}
                <span>{isDark ? 'Light theme' : 'Dark theme'}</span>
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 px-4 py-2 hover:bg-white/10 cursor-pointer">
          <RiQuestionLine />
          <span>Help</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;