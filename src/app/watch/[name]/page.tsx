"use client";

import LoadingSvg from "@/shared/icons/svg/loading";
import { VideoInterface, VideoState } from "@/store/interfaces/video.interface";
import { getVideo } from "@/store/reducers/video-slice.reducer";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import ReactPlayerType from "react-player";
import { useDispatch, useSelector } from "react-redux";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function WatchPage({ params }: { params: { name: string } }) {
  const dispatch = useDispatch();
  const [videoDetails, setVideoDetails] = useState<VideoInterface | null>(null);
  const videoProp = useSelector((state: VideoState) => state.video);
  const [streamVideoPath, setStreamVideoPath] = useState<string>(
    "TriggerPlayerOnloadWithError"
  );
  const [updateStreamVideoPath, setUpdateStreamVideoPath] =
    useState<boolean>(false);
  const playerRef = useRef<ReactPlayerType | null>(null);
  const [playerReady, setPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    if (params.name) {
      dispatch(getVideo({ name: params.name }));
    }
  }, []);

  useEffect(() => {
    if (updateStreamVideoPath && videoProp.getVideo.success && params.name) {
      setStreamVideoPath(
        `${process.env.NEXT_PUBLIC_API_PATH}/video/stream/?v=${params.name}`
      );
    }
  }, [videoProp.getVideo, updateStreamVideoPath, params.name]);

  useEffect(() => {
    if (videoProp.getVideo.success && videoProp.getVideo.data) {
      setVideoDetails(videoProp.getVideo.data);
    }
  }, [videoProp.getVideo]);

  return (
    <>
      <div
        className={`w-full relative min-h-[300px] ${
          playerReady ? "hidden" : ""
        }`}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <div className="flex w-full h-full">
            <LoadingSvg />
          </div>
        </div>
      </div>
      <div className={`mt-2 ${playerReady ? "" : "hidden"}`}>
        <ReactPlayer
          url={streamVideoPath}
          config={{
            file: {
              forceVideo: true,
              attributes: {
                crossOrigin: "true",
                playsInline: true,
              },
            },
          }}
          width="100%"
          height="100%"
          controls
          autoPlay
          progressInterval={5}
          id="previewPlayer"
          className="w-full h-full [&>video]:max-h-[75vh]"
          onReady={(player) => {
            setPlayerReady(true);
            playerRef.current = player;
          }}
          onError={() => {
            if (streamVideoPath === "TriggerPlayerOnloadWithError") {
              setUpdateStreamVideoPath(true);
            }
          }}
        />
      </div>
      <div>
        <h1>{videoDetails?.title || ""}</h1>
        <hr />
      </div>
      <div className="my-2">
        <p className="text-gray-400">{videoDetails?.about}</p>
      </div>
    </>
  );
}
