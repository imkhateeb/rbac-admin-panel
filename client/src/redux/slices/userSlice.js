import { createSlice } from "@reduxjs/toolkit";
import { users } from "../../utils/testData";

import {
  fetchUsers,
  updateUser,
  deleteUser,
  addUser,
} from "../reducers/usersReducers";

const initialState = {
  users: users,
  loadingUsers: false,
  errorUsers: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loadingUsers = true;
        state.errorUsers = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loadingUsers = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loadingUsers = false;
        state.errorUsers = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );
        state.users[index] = updatedUser;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const id = action.payload;
        state.users = state.users.filter((user) => user._id !== id);
      })
      .addCase(addUser.fulfilled, (state, action) => {
        const newUser = action.payload;
        // Reverse, add, and reverse again
        state.users = [...state.users].reverse();
        state.users.push(newUser);
        state.users.reverse();
      });
  },
});

export default usersSlice.reducer;
