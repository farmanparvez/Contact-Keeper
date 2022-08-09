import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/reducers/authReducer";
import contactReducer from "./redux/reducers/contactReducer";

const store = configureStore({
  reducer: { auth: authReducer, contact: contactReducer },
});

export default store;
