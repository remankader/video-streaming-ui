"use client";

import VideoListView from "@/shared/components/video-list/view";
import {
  SINGLE_CATEGORY_PAGE_TAKE,
  VIDEO_CATEGORIES,
} from "@/shared/constants/video";
import { VideoInterface, VideoState } from "@/store/interfaces/video.interface";
import { getVideoList } from "@/store/reducers/video-slice.reducer";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import LoadingSvg from "../../../shared/icons/svg/loading";

export default function VideoCategoryPage({
  params,
}: {
  params: { category: "music" | "game" };
}) {
  const dispatch = useDispatch();
  const videoProp = useSelector((state: VideoState) => state.video);
  const [videoList, setVideoList] = useState<VideoInterface[]>([]);
  const [page, setPage] = useState<number>(1);
  const [showScrollLoadingIcon, setShowScrollLoadingIcon] =
    useState<boolean>(false);

  // fetch video list on load
  useEffect(() => {
    fetchVideoList();
  }, []);

  // each time video list is fetched
  useEffect(() => {
    setShowScrollLoadingIcon(false);

    // update videoList
    if (
      videoProp.getVideoList?.success &&
      videoProp.getVideoList?.data?.list &&
      videoProp.getVideoList?.data?.fetchParams?.category === params.category
    ) {
      if (
        !videoList[0] ||
        !videoProp.getVideoList.data.list.some(
          (item) => item.id === videoList[0].id
        )
      ) {
        setVideoList(videoList.concat(videoProp.getVideoList.data.list));
      }
    }
  }, [videoProp.getVideoList]);

  // fetch video list function
  const fetchVideoList = () => {
    setShowScrollLoadingIcon(true);

    dispatch(
      getVideoList({
        category: params.category,
        take: SINGLE_CATEGORY_PAGE_TAKE,
        skip: page * SINGLE_CATEGORY_PAGE_TAKE - SINGLE_CATEGORY_PAGE_TAKE,
      })
    );

    setPage(page + 1);
  };

  return (
    <div className="mt-2">
      <div>
        <h1>{VIDEO_CATEGORIES[params.category] || ""}</h1>
        <hr />
      </div>

      {videoList && (
        <InfiniteScroll
          dataLength={videoList.length}
          next={fetchVideoList}
          hasMore={true}
          loader={<div>{showScrollLoadingIcon && <LoadingSvg />}</div>}
          className="!overflow-visible"
        >
          <VideoListView list={videoList} viewType="list" />
        </InfiniteScroll>
      )}
    </div>
  );
}
