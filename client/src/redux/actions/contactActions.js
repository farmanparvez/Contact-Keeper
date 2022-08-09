import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openNotificationWithIcon } from "../../utils/notification";
// const token = localStorage.getItem('token')

export const getContacts = createAsyncThunk(
  "contact/getContact",
  async (navigate, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get("/contacts", config);

      return res.data.contacts;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      if (message === "Session expires login again!" || message === "Invalid token Please Login again!") {
        openNotificationWithIcon('error', 'Failed', message)
        localStorage.removeItem("token");
        navigate('/login')
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createContact = createAsyncThunk(
  "contact/createContact",
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post("/contacts", data, config);
      return res.data.message;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contact/updateContact",
  async ({ name, email, phone, type, _id }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.patch(
        `/contacts/${_id}`,
        { name, email, phone, type },
        config
      );

      return res.data.message;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      // const msg =
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.delete(`/contacts/${id}`, config);
      return res.data.message;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
