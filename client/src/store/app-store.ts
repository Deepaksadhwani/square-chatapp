import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import chatReducer from "./slices/chat-slice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export default appStore;
