import { apiClient } from "@/lib/api-client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
export const fetchContacts = createAsyncThunk(
  "chat/fetchContacts",
  async (_, { dispatch }) => {
    try {
      const res = await apiClient.get("/contacts/get-contacts-for-dm", {
        withCredentials: true,
      });
      if (res.data.contacts) {
        dispatch(setDirectMessagesContact(res.data.contacts));
      }
      return res.data.contacts;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  },
);
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
    addChannelInChannelList: (state, action: PayloadAction<any>) => {
      const message = action.payload;
      const channels = state.channels;

      const data = channels.find(
        (channel) => channel._id === message.channelId,
      );

      const index = channels.findIndex(
        (channel) => channel._id === message.channelId,
      );

      if (index !== -1 && index !== undefined) {
        channels.splice(index, 1);
        channels.unshift(data);
      }
    },
   
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.directMessagesContacts = action.payload;
    });
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
  addChannelInChannelList,
} = chatSlice.actions;

export default chatSlice.reducer;
