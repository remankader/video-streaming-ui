"use client";

import { getVideoList } from "@/store/reducers/video-slice.reducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HOMEPAGE_CATEGORY_GRID_TAKE,
  VIDEO_CATEGORIES,
} from "@/shared/constants/video";
import { VideoInterface, VideoState } from "@/store/interfaces/video.interface";
import VideoListHeading from "@/shared/components/video-list/heading";
import VideoListView from "@/shared/components/video-list/view";

export default function HomePage() {
  const dispatch = useDispatch();
  const videoProp = useSelector((state: VideoState) => state.video);
  const [musicList, setMusicList] = useState<VideoInterface[]>([]);
  const [gameList, setGameList] = useState<VideoInterface[]>([]);

  // get video list on load
  useEffect(() => {
    Object.keys(VIDEO_CATEGORIES).map((category) => {
      dispatch(
        getVideoList({
          take: HOMEPAGE_CATEGORY_GRID_TAKE,
          category,
        })
      );
    });
  }, []);

  // set musicList and gameList
  useEffect(() => {
    if (videoProp.getVideoList?.success && videoProp.getVideoList?.data?.list) {
      const list = videoProp.getVideoList.data.list;
      const category = videoProp.getVideoList.data.fetchParams?.category;
      switch (category) {
        case "music":
          setMusicList(list);
          break;
        case "game":
          setGameList(list);
          break;
      }
    }
  }, [videoProp.getVideoList]);

  return (
    <>
      <div className="mt-2">
        <VideoListHeading title={VIDEO_CATEGORIES.music} path="/videos/music" />
        <div>
          {musicList && <VideoListView list={musicList} viewType="grid" />}
        </div>
      </div>
      <div className="mt-10">
        <VideoListHeading title={VIDEO_CATEGORIES.game} path="/videos/game" />
        <div>
          {gameList && <VideoListView list={gameList} viewType="grid" />}
        </div>
      </div>
    </>
  );
}
