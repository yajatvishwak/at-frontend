import axios from "axios";
import clone from "just-clone";
import { FunctionComponent, useEffect, useState } from "react";
import { VideoDisplay } from "../_types/VideoDisplay";
import NavBar from "./_navbar";
import VideoCard from "./_videocard";

interface AppProps {}

const App: FunctionComponent<AppProps> = ({}) => {
  const [data, setData] = useState<VideoDisplay[]>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_URL + "getallvids").then((d) => {
      let d1: VideoDisplay[] = [];
      if (d.data) {
        d.data.map((item: any) => {
          d1.push({
            authorname: item.username,
            caption: item.caption,
            likes: item.likes,
            authordpurl:
              process.env.NEXT_PUBLIC_URL + "profile/" + item.profilepic,
            _id: item._id,
            authorid: item.userid,
            vidurl: process.env.NEXT_PUBLIC_URL + "video/" + item.filename,
          });
        });
      }
      setData(d1);
      setLoading(false);
    });
  }, []);

  return (
    <section className="min-h-screen h-full bg-slate-800 flex flex-col text-white p-10 font-dm ">
      <NavBar />
      <div className="flex flex-col items-center gap-3 mt-20">
        <div className="text-5xl font-bold">Discover AmphiTweets</div>
        <div className="text-2xl opacity-50">#amphitweet</div>
      </div>
      <div className="grid grid-cols-4  flex-1 gap-4  mt-7">
        {/* vid element */}
        {data &&
          data.map((vc) => {
            return (
              <>
                <VideoCard
                  allowDelete={false}
                  data={vc}
                  like={(id: string) => {
                    let d = clone(data);
                    d.find((i) => i._id === id)!.likes += 1;
                    setData(d);
                    axios.get(process.env.NEXT_PUBLIC_URL + "like/" + id);
                  }}
                />
              </>
            );
          })}
      </div>
    </section>
  );
};

export default App;
