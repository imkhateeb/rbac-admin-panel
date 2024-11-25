import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRoles,
  updateRole,
  deleteRole,
  addRole,
} from "../reducers/rolesReducers";
import { roles } from "../../utils/testData";

const initialState = {
  roles: roles,
  loadingRoles: false,
  errorRoles: null,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loadingRoles = true;
        state.errorRoles = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loadingRoles = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loadingRoles = false;
        state.errorRoles = action.error.message;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const updatedRole = action.payload;
        const index = state.roles.findIndex(
          (role) => role._id === updatedRole._id
        );
        state.roles[index] = updatedRole;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        const id = action.payload;
        state.roles = state.roles.filter((role) => role._id !== id);
      })
      .addCase(addRole.fulfilled, (state, action) => {
        const newRole = action.payload;
        // Reverse, add, and reverse again
        state.roles = [...state.roles].reverse();
        state.roles.push(newRole);
        state.roles.reverse();
      });
  },
});

export default rolesSlice.reducer;
