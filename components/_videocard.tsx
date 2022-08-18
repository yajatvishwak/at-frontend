import { FunctionComponent } from "react";
import { VideoDisplay } from "../remotion/_types/VideoDisplay";

interface VideoCardProps {
  allowDelete: boolean;
  data: VideoDisplay;
  deleteVid?: (id: string) => void;
  like: (id: string) => void;
}

const VideoCard: FunctionComponent<VideoCardProps> = ({
  allowDelete,
  data,
  like,
  deleteVid,
}) => {
  return (
    <div className="rounded-3xl  font-dm">
      <div className="flex  p-3  items-center w-full gap-3 ">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img
              src={data.authordpurl || "https://placeimg.com/192/192/people"}
            />
          </div>
        </div>
        <div className="font-bold drop-shadow-2xl">@{data.authorname}</div>
        <div className=" ml-auto flex items-center gap-2">
          <div
            onClick={() => like(data._id)}
            data-tip="Like!!"
            className="cursor-pointer hover:scale-90 transition-all font-bold drop-shadow-2xl"
          >
            {data.likes} ❤️
          </div>
          {allowDelete && (
            <div
              //@ts-ignore
              onClick={() => deleteVid(data._id)}
              className="hover:text-red-500 drop-shadow-2xl transition-all "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <video
        className="object-cover w-full h-[50rem] rounded-3xl"
        controls
        loop
        src={data.vidurl}
      ></video>
      <div className="  gap-2  w-full flex flex-col p-4">
        <div className="line-clamp-3">{data.caption}</div>
      </div>
    </div>
  );
};

export default VideoCard;
