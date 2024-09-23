import { User } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ALL_USERS, CURRENT_USER } from "@/lib/constants";

type InitialState = {
  user: User | null;
  allUsers: User[];
};

const initialState: InitialState = {
  user: localStorage.getItem(CURRENT_USER)
    ? JSON.parse(localStorage.getItem(CURRENT_USER)!)
    : null,
  allUsers: localStorage.getItem(ALL_USERS)
    ? JSON.parse(localStorage.getItem(ALL_USERS)!)
    : [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAllUsers: (state, action: PayloadAction<User[]>) => {
      state.allUsers = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.allUsers.push(action.payload);
      localStorage.setItem(ALL_USERS, JSON.stringify(state.allUsers));
    },
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem(CURRENT_USER, JSON.stringify({ ...action.payload }));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem(CURRENT_USER);
    },
  },
});

export const { setUser, setAllUsers, addUser, login, logout } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectAllUsers = (state: RootState) => state.user.allUsers;

export default userSlice.reducer;
