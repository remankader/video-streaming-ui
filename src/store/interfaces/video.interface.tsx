export interface VideoInterface {
  id: number;
  name: string;
  format: string;
  duration: number;
  framerate: number;
  width: number;
  height: number;
  title: string;
  category: string;
  about: string;
  processStatus: number;
  statusId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetVideoAction {
  payload: { name: string };
  type: string;
}

export interface GetVideoListAction {
  payload: {
    take: number;
    skip?: number;
    category?: string;
    title?: string;
    orderBy?: string;
    order?: string;
  };
  type: string;
}

export interface PostVideoAction {
  payload: FormData;
  type: string;
}

export interface SetGetVideoInterface {
  success: boolean;
  status: number;
  messages: { msg: string }[];
  data: VideoInterface;
}

export interface SetGetVideoListInterface {
  success: boolean;
  status: number;
  messages: { msg: string }[];
  data: {
    list: VideoInterface[];
    total: number;
    fetchParams: {
      skip: number;
      take: number;
      category: string;
      title?: string;
      orderBy: string;
      order: "ASC" | "DESC";
    };
  };
}

export interface VideoState {
  video: {
    getVideo: SetGetVideoInterface;
    getVideoList: SetGetVideoListInterface;
    postVideo: any;
    deleteVideo: any;
  };
}
