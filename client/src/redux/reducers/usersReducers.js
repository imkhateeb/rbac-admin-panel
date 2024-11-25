import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
});

export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
  return user;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  return id;
});

export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const userId = uuidv4();
  user._id = userId;
  return user;
});
