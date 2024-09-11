import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userData: any;
}

const initialState: UserState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },

    removeUserData: (state) => {
      state.userData = null;
    },
  },
});

export const { removeUserData, setUserData } = userSlice.actions;
export default userSlice.reducer;
