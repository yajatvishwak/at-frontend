import { FunctionComponent, useEffect, useState } from "react";

interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
  const [username, setUsername] = useState<string>();
  useEffect(() => {
    setUsername(localStorage.getItem("username") || "Login");
  }, []);
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
            if (username === "Login")
              return (window.location.href = "/app/signup");
            window.location.href = "/app/profile";
          }}
          className=""
        >
          <div>{username}</div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
