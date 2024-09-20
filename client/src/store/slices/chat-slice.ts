import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define your state types
interface ChatState {
  selectedChatType: string | null;
  selectedChatData: any | null;
  selectedChatMessages: any[];
  directMessagesContacts: any[];
  channels: any[];
}

interface Message {
  recipient: any;
  sender: any;
}

// Initial state
const initialState: ChatState = {
  selectedChatType: null,
  selectedChatData: null,
  selectedChatMessages: [],
  directMessagesContacts: [],
  channels: [],
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
    setDirectMessagesContact: (state, action: PayloadAction<any[]>) => {
      state.directMessagesContacts = action.payload;
    },
    setChannel: (state, action: PayloadAction<any[]>) => {
      state.channels = action.payload;
    },
    addChannel: (state, action: PayloadAction<any[]>) => {
      state.channels = [action.payload, ...state.channels];
    },
    closeChat: (state) => {
      state.selectedChatData = null;
      state.selectedChatType = null;
      state.selectedChatMessages = [];
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const selectedChatType = state.selectedChatType;
      const message = action.payload;

      state.selectedChatMessages = [
        ...state.selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : message.recipient?._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : message.sender?._id,
        },
      ];
    },
  },
});

export const {
  setDirectMessagesContact,
  setSelectedChatType,
  setSelectedChatData,
  setSelectedChatMessages,
  closeChat,
  addMessage,
  setChannel,
  addChannel,
} = chatSlice.actions;

export default chatSlice.reducer;
