import { combineReducers } from "@reduxjs/toolkit";
import videoSliceReducer from "./video-slice.reducer";

const reducers = combineReducers({
  video: videoSliceReducer,
});

export default reducers;
