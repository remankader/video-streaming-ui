import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { VideoInterface } from "@/store/interfaces/video.interface";

export default function VideoListView({
  list,
  viewType,
}: {
  list: VideoInterface[];
  viewType: "list" | "grid";
}) {
  const [thumbnailErrorList, setThumbnailErrorList] = useState<string[]>([]);

  const imageLoader = ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_API_PATH}/video/thumbnail/?name=${src}&thumbNumber=1`;
  };

  return (
    <>
      <div
        className={`w-full h-full relative ${
          viewType === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 gap-x-2"
            : ""
        }`}
      >
        {list.map((v: any, k: any) => {
          return (
            <div
              key={k}
              className={`w-full mb-6 ${
                viewType === "grid" ? "relative aspect-video" : "xl:px-[12vw] md:mb-2.5"
              }`}
            >
              <Link
                href={`/watch/${v.name}/`}
                // className={`focus:ring-transparent focus:opacity-100 
                className={`focus:opacity-100 
                hover:opacity-80 linkMono hover:text-black hover:no-underline ${
                  viewType === "grid" ? "flex-row absolute top-0 left-0 right-0 bottom-0" : "md:flex"
                }`}
              >
                <div
                  className={`w-full aspect-video relative bg-slate-200 ${
                    viewType === "grid" ? "" : "md:w-1/3"
                  }`}
                >
                  <div
                    className="absolute top-0 left-0 bottom-0 right-0 
                    text-gray-300 text-center"
                  >
                    <div className="w-full h-full flex justify-center italic">
                      <div className="place-self-center">
                        {thumbnailErrorList.includes(v.name) ? (
                          <div>
                            <div>Thumbnail</div> <div>Unavailable</div>
                          </div>
                        ) : (
                          "Loading..."
                        )}
                      </div>
                    </div>
                  </div>

                  {!thumbnailErrorList.includes(v.name) && (
                    <Image
                      loader={imageLoader}
                      src={v.name}
                      fill
                      sizes="(max-height: 480px) 100vh"
                      className="w-full h-auto relative border border-gray-300 
                    dark:border-gray-700"
                      style={{ objectFit: "cover" }}
                      alt={`thumbnail_${v.name}`}
                      crossOrigin="anonymous"
                      onError={() =>
                        setThumbnailErrorList((prev: any) => {
                          return prev.concat(v.name);
                        })
                      }
                    />
                  )}

                  {v.processStatus !== 100 && (
                    <div
                      className="absolute top-0 left-0 bottom-0 right-0 
                     flex justify-center bg-black bg-opacity-50"
                    >
                      <div
                        className="place-self-center bg-white bg-opacity-10 
                      py-0.5 px-2 rounded-md text-white"
                      >
                        Processing...
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`w-full pt-0.5 pl-0.5
                 ${
                   viewType === "grid"
                     ? "place-self-center"
                     : "md:w-2/3 sm:pt-2 sm:pl-3"
                 }`}
                >
                  <div className="truncate font-semibold text-base">
                    {v.title}
                  </div>
                  {viewType === "list" && (
                    <div className="h-full hidden md:block mt-2">
                      <p className="text-gray-400">{v.about}</p>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
