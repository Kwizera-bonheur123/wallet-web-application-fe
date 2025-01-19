/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../../utils/api";
import { DynamicData } from "../../@types/DynamicData";
import { AccountState } from "../../@types/Accounts";
import { accountSchemaType } from "../../validations/Account.validation";

// Thunk to get all Accounts

export const fetchAccounts = createAsyncThunk(
  "fetch/allaccounts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/accounts");
      return data;
    } catch (error) {
      return rejectWithValue((error as DynamicData).response);
    }
  }
);

// Thunk to add new Account

export const addAccount = createAsyncThunk(
  "addAccount",
  async (AccountData: accountSchemaType, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/accounts", AccountData);
      return data;
    } catch (error) {
      return rejectWithValue((error as DynamicData).response);
    }
  }
);

// Thunk to update Account

export const updateAccount = createAsyncThunk(
  "updateAccount",
  async (AccountData: accountSchemaType, { rejectWithValue }) => {
    try {
      const { data } = await API.patch(
        `/accounts/${AccountData.id}`,
        AccountData
      );
      return data;
    } catch (error) {
      return rejectWithValue((error as DynamicData).response);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "deleteAccount",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/accounts/${id}`);
      return { id, message: data.message };
    } catch (error) {
      return rejectWithValue((error as DynamicData).response);
    }
  }
);

const initialState: AccountState = {
  isLoading: false,
  accounts: [],
  error: null,
  isAccountModelOpen: false,
};

const AccountSlice = createSlice({
  name: "Account",
  initialState,
  reducers: {
    manipulateModelVisiblity: (state) => {
      state.isAccountModelOpen = !state.isAccountModelOpen;
    },
    manipulateUpdatedAccount: (state, action: PayloadAction<DynamicData>) => {
      const AccountIndex = state.accounts.findIndex(
        (account: DynamicData) => account.id == action.payload.id
      );
      if (AccountIndex !== -1) {
        state.accounts[AccountIndex] = action.payload;
      }
    },
    manipulateAddedAccount: (state, action: PayloadAction<DynamicData>) => {
      const newAccount = { ...action.payload, transactions: [] };
      state.accounts.unshift(newAccount);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccounts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchAccounts.fulfilled,
      (state, action: PayloadAction<DynamicData>) => {
        state.accounts = action.payload.data;
        state.isLoading = false;
      }
    );
    builder.addCase(
      fetchAccounts.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload?.data?.message;
      }
    );

    // Add new Account

    builder.addCase(addAccount.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(addAccount.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(
      addAccount.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload?.data?.message;
      }
    );

    // Update Account

    builder.addCase(updateAccount.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(updateAccount.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(
      updateAccount.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload?.data?.message;
      }
    );

    builder.addCase(
      deleteAccount.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
    builder.addCase(deleteAccount.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.accounts = state.accounts.filter(
        (accounts) => accounts.id !== action.payload.id
      );
    });
  },
});

export const {
  manipulateModelVisiblity,
  manipulateUpdatedAccount,
  manipulateAddedAccount,
} = AccountSlice.actions;

export default AccountSlice.reducer;
