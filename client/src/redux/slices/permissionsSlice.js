import { createSlice } from "@reduxjs/toolkit";
import { permissions } from "../../utils/testData";
import {
  fetchPermissions,
  updatePermission,
  deletePermission,
  addPermission,
} from "../reducers/permissionsReducers";

const initialState = {
  permissions: permissions,
  loadingPermissions: false,
  errorPermissions: null,
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.loadingPermissions = true;
        state.errorPermissions = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loadingPermissions = false;
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loadingPermissions = false;
        state.errorPermissions = action.error.message;
      })
      .addCase(updatePermission.fulfilled, (state, action) => {
        const updatedPermission = action.payload;
        const index = state.permissions.findIndex(
          (permission) => permission._id === updatedPermission._id
        );
        state.permissions[index] = updatedPermission;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        const id = action.payload;
        state.permissions = state.permissions.filter(
          (permission) => permission._id !== id
        );
      })
      .addCase(addPermission.fulfilled, (state, action) => {
        const newPermission = action.payload;
        // Reverse, add, and reverse again
        state.permissions = [...state.permissions].reverse();
        state.permissions.push(newPermission);
        state.permissions.reverse();
      });
  },
});

export default permissionsSlice.reducer;
