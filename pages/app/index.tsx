import { FunctionComponent } from "react";
import NavBar from "./_navbar";
import ReactPlayer from "react-player";
import VideoCard from "./_videocard";
interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  return (
    <section className="min-h-screen h-full bg-slate-800 flex flex-col text-white p-10 font-dm ">
      <NavBar />
      <div className="flex flex-col items-center gap-3 mt-20">
        <div className="text-5xl font-bold">Discover AmphiTweets</div>
        <div className="text-2xl opacity-50">#amphitweet</div>
      </div>
      <div className="grid grid-cols-4 grid-rows-2 flex-1 gap-4 overflow-auto mt-7">
        {/* vid element */}
        <VideoCard allowDelete={false} />
        <VideoCard allowDelete={false} />
        <VideoCard allowDelete={false} />
        <VideoCard allowDelete={false} />
        <VideoCard allowDelete={false} />
        <VideoCard allowDelete={false} />
        <VideoCard allowDelete={false} />
        <VideoCard allowDelete={false} />
        <VideoCard allowDelete={false} />
        <VideoCard allowDelete={false} />
      </div>
    </section>
  );
};

export default App;
