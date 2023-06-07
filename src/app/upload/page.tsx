"use client";

import ErrorMessageList from "@/shared/components/error-message-list";
import metadataFormatter from "@/shared/utilities/metadata-formatter";
import { VIDEO_CATEGORIES } from "@/shared/constants/video";
import eventEmitter from "@/store/event-emitter";
import { postVideo } from "@/store/reducers/video-slice.reducer";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VideoState } from "@/store/interfaces/video.interface";

export const metadata = metadataFormatter("Upload");

export default function UploadPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const videoProp = useSelector((state: VideoState) => state.video);
  const fileUpload = useRef<HTMLInputElement>(null);

  // form data
  const [file, setFile] = useState<File | undefined>();
  const [fileName, setFileName] = useState<string>("");
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoCategory, setVideoCategory] = useState<string>(
    Object.keys(VIDEO_CATEGORIES)[0]
  );
  const [videoAbout, setVideoAbout] = useState<string>("");

  // handle upload
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadButtonDisabled, setUploadButtonDisabled] =
    useState<boolean>(false);
  const [showUploadProgress, setShowUploadProgress] = useState<boolean>(false);
  const [showGeneralErrorMsg, setShowGeneralErrorMsg] =
    useState<boolean>(false);
  const [uploadProgressApproximate, setUploadProgressApproximate] =
    useState<number>(0);

  // handle upload error messages
  const [generalErrorMsg, setGeneralErrorMsg] = useState<[]>([]);
  const [fileErrorMsg, setFileErrorMsg] = useState<string>("");
  const [titleErrorMsg, setTitleErrorMsg] = useState<string>("");
  const [categoryErrorMsg, setCategoryErrorMsg] = useState<string>("");

  // get approximate upload progress
  useEffect(() => {
    eventEmitter.on("UPLOAD_PROGRESS", (percent) => {
      setUploadProgressApproximate(percent);
    });

    // stop listening on unmount
    return function cleanup() {
      eventEmitter.off("UPLOAD_PROGRESS");
    };
  }, []);

  // handle submit response
  useEffect(() => {
    if (!videoProp?.postVideo?.success) {
      // show error messages
      if (videoProp?.postVideo?.messages) {
        const findMsgForSpecificSection = (path: string) => {
          return (
            videoProp.getVideo.messages.find((obj: any) => obj.path === path)
              ?.msg || ""
          );
        };

        setFileErrorMsg(findMsgForSpecificSection("file"));
        setTitleErrorMsg(findMsgForSpecificSection("title"));
        setCategoryErrorMsg(findMsgForSpecificSection("category"));

        const selectedSections = ["file", "title", "category"];

        if (showGeneralErrorMsg) {
          setGeneralErrorMsg(
            videoProp.postVideo.messages.filter(function (obj: any) {
              return !selectedSections.includes(obj.path);
            })
          );
        }

        setUploadButtonDisabled(false);
        setShowUploadProgress(false);
        setUploadProgress(0);
      }
    } else {
      // on success
      setGeneralErrorMsg([]);

      if (uploadProgressApproximate === 100) {
        setUploadProgress(100);
      }
    }
  }, [videoProp.postVideo]);

  // redirect on upload success
  useEffect(() => {
    if (uploadProgress === 100) {
      const msgType = "success";
      const msg = "Video uploaded successfully. Processing video...";

      router.push(`/?msgType=${msgType}&msg=${msg}`);
    }
  }, [uploadProgress]);

  // set upload progress from approximate upload progress
  useEffect(() => {
    if (uploadProgressApproximate < 100) {
      setUploadProgress(uploadProgressApproximate);
    }
  }, [uploadProgressApproximate]);

  // handle visible file button click
  const handleSelectVideo = () => {
    setUploadProgress(0);
    fileUpload.current?.click();

    setShowUploadProgress(false);
    setUploadButtonDisabled(false);
  };

  // handle selected file data
  const handleSelectedFileData = (event: any) => {
    const files = event.target.files;

    if (files?.length) {
      setFile(files[0]);

      const url = URL.createObjectURL(files[0]);
      setFileName(files[0].name);

      setFileErrorMsg("");
    }
  };

  // submit form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let allowSubmit: boolean = true;

    if (!file) {
      allowSubmit = false;
      setFileErrorMsg("file is required");
    }

    if (!videoTitle) {
      allowSubmit = false;
      setTitleErrorMsg("title is required");
    }

    if (!VIDEO_CATEGORIES.hasOwnProperty(videoCategory)) {
      allowSubmit = false;
      setCategoryErrorMsg("invalid category");
    }

    if (allowSubmit) {
      const data = new FormData();
      data.append("file", file as File);
      data.append("title", videoTitle);
      data.append("category", videoCategory);
      data.append("about", videoAbout);

      dispatch(postVideo(data));

      setShowGeneralErrorMsg(true);
      setUploadButtonDisabled(true);
      setShowUploadProgress(true);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-2/3 lg:w-3/5 xl:w-1/3 lg:mt-5">
        <div>
          <h1>Upload</h1>
          <hr />
        </div>
        <div>
          <ErrorMessageList errorMessageList={generalErrorMsg} />
        </div>
        <div className="w-full">
          <div className="mb-3">
            <label htmlFor="videoCategory" className="inputLabel">
              Select video <span className="labelLight">*</span>
            </label>
            <div
              className={`mt-0 flex border border-gray-300 bg-gray-100 
              dark:border-gray-600 dark:bg-gray-700 rounded-md cursor-pointer 
              ${fileErrorMsg ? "inputDanger" : ""}`}
              onClick={handleSelectVideo}
            >
              <button
                type="button"
                className="buttonLight !rounded-none !rounded-tl-md !rounded-bl-md"
              >
                <span>Select</span>
              </button>
              <div className="flex place-self-center px-3 text-gray-500 text-xs truncate">
                <div className="truncate block">{fileName}</div>
              </div>
            </div>
            <div className="labelLight labelDanger">{fileErrorMsg}</div>
          </div>

          <div className="">
            <form onSubmit={handleSubmit}>
              <div className="hidden">
                <input
                  className=""
                  type="file"
                  ref={fileUpload}
                  onChange={handleSelectedFileData}
                  accept=".mkv,.mp4,.mov"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="videoTitle" className="inputLabel">
                  Title <span className="labelLight">*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Video title"
                  className={`inputText ${titleErrorMsg ? "inputDanger" : ""}`}
                  id="videoTitle"
                  onChange={(event) => {
                    setVideoTitle(event.target.value);
                    setTitleErrorMsg(
                      event.target.value ? "" : "title is required"
                    );
                  }}
                />
                <div className="labelLight labelDanger">{titleErrorMsg}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="videoCategory" className="inputLabel">
                  Category <span className="labelLight">*</span>
                </label>

                <div className="relative">
                  <select
                    name="category"
                    id="videoCategory"
                    className={`select appearance-none !pr-7 inputText ${
                      categoryErrorMsg ? "inputDanger" : ""
                    }`}
                    defaultValue={videoCategory}
                    onChange={(event) => {
                      setVideoCategory(event.target.value);
                      setCategoryErrorMsg(
                        VIDEO_CATEGORIES.hasOwnProperty(event.target.value)
                          ? ""
                          : "invalid category"
                      );
                    }}
                  >
                    {Object.entries(VIDEO_CATEGORIES).map(([key, value]) => {
                      return (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      );
                    })}
                  </select>
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 
                flex items-center px-2"
                  >
                    <ChevronDownIcon className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
                <div className="labelLight labelDanger">{categoryErrorMsg}</div>
              </div>

              <div className="mb-6">
                <label htmlFor="videoAbout" className="inputLabel">
                  About
                </label>
                <textarea
                  name="about"
                  id="videoAbout"
                  className="textarea"
                  placeholder="About video..."
                  onChange={(event) => setVideoAbout(event.target.value)}
                ></textarea>
              </div>

              <div className="pt-2.5">
                {uploadButtonDisabled ? (
                  <button
                    type="submit"
                    className="buttonLight buttonDisabled w-full"
                    disabled
                  >
                    Upload
                  </button>
                ) : (
                  <button type="submit" className="buttonLight w-full">
                    Upload
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="pt-4 h-40">
            {showUploadProgress ? (
              <>
                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium">
                    {uploadProgress === 100
                      ? "Uploaded Successfully"
                      : "Uploading"}
                  </span>
                  <span className="text-sm font-medium">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className={`${
                      uploadProgress === 100
                        ? "bg-orange-500"
                        : "bg-orange-400 shim-progressbar"
                    } h-2.5 rounded-full`}
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
