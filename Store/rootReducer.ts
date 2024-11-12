import { combineReducers } from "@reduxjs/toolkit";
import appSlice from "./appSlice";

const rootReducer = combineReducers({
  category: appSlice,
});

export default rootReducer;
