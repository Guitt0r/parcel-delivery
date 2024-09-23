import { Request } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ALL_REQUESTS } from "@/lib/constants";

type InitialState = {
  matchingRequests: Request[];
  userRequests: Request[];
  allRequests: Request[];
};

const initialState: InitialState = {
  matchingRequests: [],
  userRequests: [],
  allRequests: localStorage.getItem(ALL_REQUESTS)
    ? JSON.parse(localStorage.getItem(ALL_REQUESTS)!)
    : [],
};

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setAllRequests: (state, action: PayloadAction<Request[]>) => {
      state.allRequests = action.payload;
    },
    setMathchingRequests: (state, action: PayloadAction<Request>) => {
      const matching = state.allRequests.filter(
        (request) =>
          request.cityFrom === action.payload.cityFrom &&
          request.cityTo === action.payload.cityTo &&
          (action.payload.requestType === "delivery"
            ? request.dispatchDate >= action.payload.dispatchDate
            : request.dispatchDate <= action.payload.dispatchDate) &&
          action.payload.id !== request.id
      );
      state.matchingRequests = matching;
    },
    setUserRequests: (state, action: PayloadAction<{ userId: string }>) => {
      state.userRequests = state.allRequests.filter(
        (request) => request.userId === action.payload.userId
      );
    },
    addRequest: (state, action: PayloadAction<Request>) => {
      state.userRequests.push(action.payload);
      state.allRequests.push(action.payload);
      localStorage.setItem(ALL_REQUESTS, JSON.stringify(state.allRequests));
    },
    deleteRequest: (state, action: PayloadAction<Request>) => {
      state.userRequests = state.userRequests.filter(
        (request) => request.id !== action.payload.id
      );
      state.allRequests = state.allRequests.filter(
        (request) => request.id !== action.payload.id
      );
      localStorage.setItem(ALL_REQUESTS, JSON.stringify(state.allRequests));
    },
    changeRequest: (state, action: PayloadAction<Request>) => {
      state.userRequests = state.userRequests.map((request) => {
        if (request.id === action.payload.id) {
          return { ...request, ...action.payload };
        }
        return request;
      });
      state.allRequests = state.allRequests.map((request) => {
        if (request.id === action.payload.id) {
          return { ...request, ...action.payload };
        }
        return request;
      });
      localStorage.setItem(ALL_REQUESTS, JSON.stringify(state.allRequests));
    },
  },
});

export const {
  setAllRequests,
  setUserRequests,
  setMathchingRequests,
  addRequest,
  deleteRequest,
  changeRequest,
} = requestSlice.actions;

export const selectMatchingRequests = (state: RootState) =>
  state.request.matchingRequests;

export const selectUserRequests = (state: RootState) =>
  state.request.userRequests;
export const selectAllRequests = (state: RootState) =>
  state.request.allRequests;

export default requestSlice.reducer;
