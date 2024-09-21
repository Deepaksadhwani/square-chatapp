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
      addContactsInDMContacts: (state, action) => {
        const message = action.payload;
        const userId = state.selectedChatData._id || state.selectedChatData.id;
      
        // Determine fromId based on who the other person in the conversation is
        const fromId = message.sender._id !== userId
          ? message.recipient._id
          : message.sender._id;
      
        // Determine fromData based on the sender and recipient, making sure it correctly identifies the contact
        const fromData = message.sender._id !== userId
          ? message.sender // If the sender is not the user, use the sender data
          : message.recipient; // Otherwise, use the recipient data
      
        // Create a shallow copy of the contacts array to avoid direct mutations
        let dmContacts = [...state.directMessagesContacts];
      
        // Find the existing contact in the contacts list
        const index = dmContacts.findIndex((contact) => contact._id === fromId);
      
        if (index !== -1) {
          // If the contact exists, remove it and add it to the front immutably
          const existingContact = dmContacts.splice(index, 1)[0]; // Remove the existing contact
          dmContacts = [existingContact, ...dmContacts]; // Add the existing contact to the front
        } else {
          // If the contact doesn't exist, add it to the front
          dmContacts = [fromData, ...dmContacts];
        }
      
        // Update the state immutably
        state.directMessagesContacts = dmContacts;
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
    addChannelInChannelList,
    addContactsInDMContacts
  } = chatSlice.actions;

  export default chatSlice.reducer;
