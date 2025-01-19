/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DynamicData } from "../../@types/DynamicData";
import API from "../../utils/api";
import { LoginSchemaType } from "../../validations/auth/login.validation";

export const login = createAsyncThunk(
  "login",
  async (loginData: LoginSchemaType, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/users/login", loginData);
      return data;
    } catch (error) {
      return rejectWithValue((error as DynamicData).response);
    }
  }
);

interface LoginState {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  message: string | null;
}

const initialState: LoginState = {
  isLoading: false,
  isAuthenticated: false,
  error: null,
  message: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.message = action.payload.message;

      if (action.payload.token) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload?.data?.message;
    });
  },
});

export const loginReducer = loginSlice.reducer;
