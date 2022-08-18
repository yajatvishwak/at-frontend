import axios from "axios";
import clone from "just-clone";
import { FunctionComponent, useEffect, useState } from "react";
import { VideoDisplay } from "../../remotion/_types/VideoDisplay";
import NavBar from "./_navbar";
import VideoCard from "./_videocard";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const [data, setData] = useState<VideoDisplay[]>();
  const [pp, setPP] = useState();
  const [name, setName] = useState();
  useEffect(() => {
    //@ts-ignore
    if (localStorage.getItem("userid")) setPP(localStorage.getItem("userid"));
    //@ts-ignore
    if (localStorage.getItem("username"))
      //@ts-ignore
      setName(localStorage.getItem("username"));
    else window.location.href = "/app/login";
  }, []);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_URL +
          "getmyvids" +
          "/" +
          localStorage.getItem("userid")
      )
      .then((d) => {
        let d1: VideoDisplay[] = [];
        if (d.data) {
          d.data.map((item: any) => {
            d1.push({
              authorname: item.username,
              caption: item.caption,
              likes: item.likes,
              authordpurl:
                process.env.NEXT_PUBLIC_URL + "profile2/" + item.profilepic,
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
      {loading && (
        <div className="h-screen animate-pulse w-full grid place-items-center">
          loading...{" "}
        </div>
      )}
      {!loading && (
        <>
          <div className="flex flex-col items-center gap-3 my-20">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2">
                <img src={process.env.NEXT_PUBLIC_URL + "profile2/" + pp} />
              </div>
            </div>
            <div className="text-4xl mt-3">@{name}</div>
          </div>
          <div className="grid grid-cols-4  flex-1 gap-4  mt-7">
            {/* vid element */}
            {data &&
              data.map((vc) => {
                return (
                  <>
                    <VideoCard
                      allowDelete={true}
                      data={vc}
                      deleteVid={(id: string) => {
                        if (confirm("Are you sure?")) {
                          //console.log("cakked");
                          let d = clone(data);
                          d = d.filter((item) => item._id !== id);
                          //console.log(d);
                          setData(d);
                          axios.get(
                            process.env.NEXT_PUBLIC_URL + "delete/" + id
                          );
                        }
                      }}
                      like={(id: string) => {
                        // let d = clone(data);
                        // d.find((i) => i._id === id)!.likes += 1;
                        // setData(d);
                        // axios.get(process.env.NEXT_PUBLIC_URL + "like/" + id);
                      }}
                    />
                  </>
                );
              })}
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
