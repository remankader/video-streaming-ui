import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getVideo,
  getVideoList,
  postVideo,
  setGetVideo,
  setGetVideoList,
  setPostVideo,
} from "../reducers/video-slice.reducer";
import request from "../request";
import eventEmitter from "../event-emitter";
import {
  GetVideoAction,
  GetVideoListAction,
  PostVideoAction,
} from "../interfaces/video.interface";
import { AxiosProgressEvent } from "axios";

export function* videoSaga() {
  yield takeLatest(getVideo.type, handleGetVideo);
  yield takeEvery(getVideoList.type, handleGetVideoList);
  yield takeLatest(postVideo.type, handlePostVideo);
}

export function* handleGetVideo(action: GetVideoAction): any {
  const videoId = action.payload.name;

  const response = yield call(
    request,
    `video/${String(videoId)}`,
    "get",
    "params"
  );
  yield put(setGetVideo(response));
}

export function* handleGetVideoList(action: GetVideoListAction): any {
  const response = yield call(
    request,
    "video",
    "get",
    "params",
    action.payload
  );
  yield put(setGetVideoList(response));
}

export function* handlePostVideo(action: PostVideoAction): any {
  const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
    if (progressEvent.loaded && progressEvent.total) {
      eventEmitter.emit(
        "UPLOAD_PROGRESS",
        Math.floor(100 * (progressEvent.loaded / progressEvent.total))
      );
    }
  };

  const response = yield call(
    request,
    "video",
    "post",
    "data",
    action.payload,
    onUploadProgress
  );
  yield put(setPostVideo(response));
}
