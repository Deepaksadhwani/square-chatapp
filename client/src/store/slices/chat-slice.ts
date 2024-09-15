import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define your state types
interface ChatState {
  selectedChatType: string | null;
  selectedChatData: any | null;
  selectedChatMessages: any[];
}

// Initial state
const initialState: ChatState = {
  selectedChatType: null,
  selectedChatData: null,
  selectedChatMessages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChatType: (state, action: PayloadAction<string | null>) => {
      state.selectedChatType = action.payload;
    },
    setSelectedChatData: (state, action: PayloadAction<any>) => {
      state.selectedChatData = action.payload;
    },
    setSelectedChatMessages: (state, action: PayloadAction<any[]>) => {
      state.selectedChatMessages = action.payload;
    },
    closeChat: (state) => {
      state.selectedChatData = null;
      state.selectedChatType = null;
      state.selectedChatMessages = [];
    },
  },
});

export const {
  setSelectedChatType,
  setSelectedChatData,
  setSelectedChatMessages,
  closeChat,
} = chatSlice.actions;

export default chatSlice.reducer;
