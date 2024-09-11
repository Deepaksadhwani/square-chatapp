import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export default appStore;
