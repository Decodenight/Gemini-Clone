import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  conversations: [],
  currentChat: {
    messages: [],
  },
};

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.currentChat.messages.push(action.payload);
    },
    newChat: (state) => {
      // Only save the chat if it has messages
      if (state.currentChat.messages.length > 0) {
        // Find the first user message to use as the title
        const firstUserMessage = state.currentChat.messages.find(msg => msg.role === 'user');
        const title = firstUserMessage 
          ? firstUserMessage.content.slice(0, 30) + (firstUserMessage.content.length > 30 ? '...' : '')
          : 'New Chat';

        state.conversations.unshift({
          title,
          messages: [...state.currentChat.messages],
        });
      }
      // Clear current chat
      state.currentChat.messages = [];
    },
  },
});

export const { addMessage, newChat } = chatSlice.actions;
export default chatSlice.reducer;