"use client";

import VideoListView from "@/shared/components/video-list/view";
import { SINGLE_CATEGORY_PAGE_TAKE } from "@/shared/constants/video";
import { VideoInterface, VideoState } from "@/store/interfaces/video.interface";
import { getVideoList } from "@/store/reducers/video-slice.reducer";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import LoadingSvg from "../../shared/icons/svg/loading";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [searchParamsUpdated, setSearchParamsUpdated] =
    useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);
  const videoProp = useSelector((state: VideoState) => state.video);
  const [videoList, setVideoList] = useState<VideoInterface[]>([]);
  const [page, setPage] = useState<number>(1);
  const [showScrollLoadingIcon, setShowScrollLoadingIcon] =
    useState<boolean>(false);

  // on url search param update
  useEffect(() => {
    setSearchParamsUpdated(true);
    setVideoList([]);
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    if (searchParamsUpdated) {
      setSearchParamsUpdated(false);
      fetchVideoList();
    }
  }, [searchParamsUpdated]);

  // each time video list is fetched
  useEffect(() => {
    setNoResults(true);
    setShowScrollLoadingIcon(false);

    // update videoList
    if (
      videoProp.getVideoList?.success &&
      videoProp.getVideoList?.data?.fetchParams.title &&
      videoProp.getVideoList?.data?.list
    ) {
      setVideoList(videoList.concat(videoProp.getVideoList.data.list));
    }
  }, [videoProp.getVideoList]);

  // fetch video list function
  const fetchVideoList = () => {
    setNoResults(false);
    setShowScrollLoadingIcon(true);

    if (searchParams.get("title")) {
      dispatch(
        getVideoList({
          title: searchParams.get("title") as string,
          take: SINGLE_CATEGORY_PAGE_TAKE,
          skip: page * SINGLE_CATEGORY_PAGE_TAKE - SINGLE_CATEGORY_PAGE_TAKE,
        })
      );
    } else {
      setNoResults(true);
    }

    setPage(page + 1);
  };

  return (
    <div className="mt-2">
      <div>
        <h1>Search</h1>
        <hr />
      </div>

      {videoList.length ? (
        <InfiniteScroll
          dataLength={videoList.length}
          next={fetchVideoList}
          hasMore={true}
          loader={<div>{showScrollLoadingIcon && <LoadingSvg />}</div>}
          className="!overflow-visible"
        >
          <VideoListView list={videoList} viewType="list" />
        </InfiniteScroll>
      ) : (
        noResults && (
          <div className="flex justify-center">
            <h2 className="text-gray-600">No results found</h2>
          </div>
        )
      )}
    </div>
  );
}
