import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./features/RegisterSlice";
import { loginReducer } from "./features/loginSlice";
import AccountSlice from "./features/AccountSlice";

export const store = configureStore({
  reducer: {
    register: RegisterSlice,
    login: loginReducer,
    accounts: AccountSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
