import { FunctionComponent } from "react";

interface VideoCardProps {
  allowDelete: boolean;
}

const VideoCard: FunctionComponent<VideoCardProps> = ({ allowDelete }) => {
  return (
    <div className="rounded-3xl flex-1  row-span-2 min-h-[50rem] bg-slate-900 relative font-dm">
      <div className="flex absolute top-4 left-4 items-center w-full gap-3">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <div className="font-bold drop-shadow-2xl">@yojatvishhwakk</div>
        <div className="ml-auto mr-7 flex items-center gap-2">
          <div className="font-bold drop-shadow-2xl">1.3k ❤️</div>
          {allowDelete && (
            <div className="hover:text-red-500 drop-shadow-2xl transition-all ">
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
        className="object-cover h-full rounded-3xl"
        controls
        loop
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      ></video>

      <div className="absolute rounded-b-3xl gap-2 bg-white  bg-opacity-20 backdrop-blur-lg  hover:bg-black hover:bg-opacity-50 transition-all bottom-0 w-full flex flex-col p-4">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. In
          recusandae voluptatem distinctio
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
