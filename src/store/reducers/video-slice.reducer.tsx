import { createSlice } from "@reduxjs/toolkit";
import {
  GetVideoAction,
  GetVideoListAction,
  SetGetVideoInterface,
  SetGetVideoListInterface,
} from "../interfaces/video.interface";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    getVideo: {} as SetGetVideoInterface,
    getVideoList: {} as SetGetVideoListInterface,
    postVideo: {},
    deleteVideo: {},
  },
  reducers: {
    getVideo(state, action: GetVideoAction) {},
    getVideoList(state, action: GetVideoListAction) {},
    postVideo(state, action) {},
    deleteVideo(state, action) {},
    setGetVideo(state, action) {
      state.getVideo = action.payload;
    },
    setGetVideoList(state, action) {
      state.getVideoList = action.payload;
    },
    setPostVideo(state, action) {
      state.postVideo = action.payload;
    },
    setDeleteVideo(state, action) {
      state.deleteVideo = action.payload;
    },
  },
});

export const {
  getVideo,
  getVideoList,
  postVideo,
  deleteVideo,
  setGetVideo,
  setGetVideoList,
  setPostVideo,
  setDeleteVideo,
} = videoSlice.actions;

export default videoSlice.reducer;
