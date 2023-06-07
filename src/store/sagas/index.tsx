import { all } from "redux-saga/effects";
import { videoSaga } from "./video.saga";

export default function* sagas() {
  yield all([videoSaga()]);
}
