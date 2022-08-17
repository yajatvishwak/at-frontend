import { FunctionComponent } from "react";

interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
  return (
    <div className="flex font-dm">
      <div className="flex items-center gap-4 font-bold">
        <img
          src="https://i.imgur.com/sWVfjPN.png"
          className="w-12 h-12"
          alt=""
        />
        <div className="text-2xl">AmphiTweet</div>
      </div>
      <div className="flex gap-9 items-center ml-auto">
        <div>AmphiTweet? Whaaaa...</div>
        <div
          onClick={() => {
            window.location.href = "/app/upload";
          }}
          className="bg-blue-500 rounded-full cursor-pointer hover:scale-95 transition-all hover:bg-blue-600  px-5 py-2 "
        >
          Create
        </div>
        <div
          onClick={() => {
            window.location.href = "/app/profile";
          }}
          className="avatar"
        >
          <div className="w-10 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
