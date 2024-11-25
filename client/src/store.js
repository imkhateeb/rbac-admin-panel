import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./redux/slices/userSlice";
import rolesSlice from "./redux/slices/rolesSlice";
import permissionsSlice from "./redux/slices/permissionsSlice";

const store = configureStore({
  reducer: {
    users: usersSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
  },
});

export default store;
