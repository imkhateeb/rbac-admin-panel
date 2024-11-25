import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const updateRole = createAsyncThunk("roles/updateRole", async (role) => {
  return role;
});

const deleteRole = createAsyncThunk("roles/deleteRole", async (id) => {
  return id;
});

const addRole = createAsyncThunk("roles/addRole", async (role) => {
  const roleId = uuidv4();
  role._id = roleId;
  return role;
});

const fetchRoles = createAsyncThunk("roles/fetchRoles", async (roles) => {
  return roles;
});

export { addRole, deleteRole, updateRole, fetchRoles };
