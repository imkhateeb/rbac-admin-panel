import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const fetchPermissions = createAsyncThunk(
  "permissions/fetchPermissions",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  }
);

export const updatePermission = createAsyncThunk(
  "permissions/updatePermission",
  async (permission) => {
    return permission;
  }
);

export const deletePermission = createAsyncThunk(
  "permissions/deletePermission",
  async (id) => {
    return id;
  }
);

export const addPermission = createAsyncThunk(
  "permissions/addPermission",
  async (permission) => {
    const permissionId = uuidv4();
    permission._id = permissionId;
    return permission;
  }
);
