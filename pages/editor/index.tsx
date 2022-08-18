import ReactTooltip from "react-tooltip";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { Scene } from "../../remotion/_types/Scene";
import { v4 as uuidv4 } from "uuid";
import Toolbox from "./Toolbox";
import SceneList from "./SceneList";
import SceneControl from "./SceneControl";
import SceneProperties from "./SceneProperties";
import clone from "just-clone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Player } from "@remotion/player";
import Composition from "../../remotion/Composition";
import { isWebUri } from "valid-url";
interface EditorProps {}

const Editor: FunctionComponent<EditorProps> = () => {
  const [selectedScene, setSelectedScene] = useState<number>(0);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [bgVid, setbgVid] = useState<string>("");
  const [bgAudio, setbgAudio] = useState<string>("");
  const [bgVidAudioLevel, setbgVidAudioLevel] = useState<number>(50);
  const [bgAudioLevel, setbgAudioLevel] = useState<number>(50);
  const [isRendering, setisRendering] = useState<boolean>(false);
  const [ispreviewOpen, setispreviewOpen] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [vid, setVid] = useState<Scene[]>([
    {
      sceneid: "1",
      duration: 150,
      timeline: [],
    },
  ]);
  useEffect(() => {
    //console.log({ bgVidAudioLevel, bgVid, bgAudio, bgAudioLevel });
  }, [bgAudio, bgAudioLevel, bgVid, bgVidAudioLevel]);
  useEffect(() => {
    if (!canvas) {
      return;
    }
    console.log(vid[selectedScene]);
    if (vid[selectedScene])
      vid[selectedScene].timeline.map((ele) => {
        if (ele.element.type === "Tweet") {
          fabric.Image.fromURL(ele.element.tlink, (img) => {
            if (canvas) {
              img.set({
                // @ts-ignore
                id: ele.eid,
                top: ele.position.x,
                centeredRotation: true,
                angle: ele.angle,
                left: ele.position.y,
              });

              img.scaleToHeight(ele.scale.height);
              img.scaleToWidth(ele.scale.width);
              canvas.add(img);
              img.moveTo(ele.zindex);
            }
          });
        }
        if (ele.element.type === "TTSTweet") {
          fabric.Image.fromURL(ele.element.tlink, (img) => {
            if (canvas) {
              img.set({
                // @ts-ignore:next-line
                id: ele.eid,
                top: ele.position.x,
                left: ele.position.y,
                centeredRotation: true,
                angle: ele.angle,
              });
              img.scaleToHeight(ele.scale.height);
              img.scaleToWidth(ele.scale.width);
              canvas.add(img);
              img.moveTo(ele.zindex);
            }
          });
        }
        if (ele.element.type === "Image") {
          fabric.Image.fromURL(ele.element.ilink, (img) => {
            if (canvas) {
              img.set({
                // @ts-ignore:next-line
                id: ele.eid,
                top: ele.position.x,
                left: ele.position.y,
                width: ele.scale.width,
                height: ele.scale.height,
                centeredRotation: true,
                angle: ele.angle,
              });
              img.scaleToHeight(ele.scale.height);
              img.scaleToWidth(ele.scale.width);
              canvas.add(img);
              img.moveTo(ele.zindex);
            }
          });
        }
        if (ele.element.type === "Text") {
          const txt = new fabric.Text(ele.element.content, {
            fill: "white",
            top: ele.position.x,
            left: ele.position.y,
            centeredRotation: true,
            angle: ele.angle,
            // @ts-ignore:next-line
            id: ele.eid,
          });

          txt.scaleToHeight(ele.scale.height);
          txt.scaleToWidth(ele.scale.width);
          canvas.add(txt);
          txt.moveTo(ele.zindex);

          // txt.moveTo(1);
        }
      });

    canvas.on("object:modified", function (e) {
      updatePosScaleAngle(
        // @ts-ignore
        e.target.id,
        e.target?.top || 42,
        e.target?.left || 42,
        e.target?.getScaledHeight() || 1000,
        e.target?.getScaledWidth() || 1000,
        e.target?.angle || 0
      );
    });
  }, [canvas]);
  // @ts-ignore:next-line
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      height: 720,
      width: 404,
    });

    setCanvas(canvas);

    //console.log(vid);

    return () => canvas.dispose();
  }, [canvasRef, vid, selectedScene]);

  function deleteObject(id: string) {
    const pvid = clone(vid);
    const indexToDelete = pvid[selectedScene].timeline.findIndex(
      (item) => item.eid === id
    );
    if (indexToDelete !== -1) {
      pvid[selectedScene].timeline.splice(indexToDelete, 1);
    }
    setVid(pvid);
  }

  function getZIndex() {
    return vid[selectedScene].timeline.length;
  }
  function custombringForward(zLevel: number) {
    //console.log("passed:", zLevel);
    if (zLevel >= vid[selectedScene].timeline.length - 1) return;
    let pvid = clone(vid);
    let currZ = pvid[selectedScene].timeline.findIndex(
      (item) => item.zindex === zLevel
    );
    let reqZ = pvid[selectedScene].timeline.findIndex(
      (item) => item.zindex === zLevel + 1
    );
    pvid[selectedScene].timeline[currZ].zindex += 1;
    //console.log("found next higher z at index", reqZ);
    if (reqZ !== -1) {
      pvid[selectedScene].timeline[reqZ].zindex -= 1;
    }

    //console.log(pvid[selectedScene].timeline);
    setVid(pvid);
  }
  function customsendBack(zLevel: number) {
    //console.log("passed:", zLevel);
    if (zLevel <= 0) return;
    let pvid = clone(vid);
    let currZ = pvid[selectedScene].timeline.findIndex(
      (item) => item.zindex === zLevel
    );
    let reqZ = pvid[selectedScene].timeline.findIndex(
      (item) => item.zindex === zLevel - 1
    );
    pvid[selectedScene].timeline[currZ].zindex -= 1;
    //console.log("found next higher z at index", reqZ);
    if (reqZ !== -1) {
      pvid[selectedScene].timeline[reqZ].zindex += 1;
    }
    //console.log(pvid[selectedScene].timeline);
    setVid(pvid);
  }
  function updatePosScaleAngle(
    id: string,
    x: number,
    y: number,
    h: number,
    w: number,
    angle: number
  ) {
    let pvid = clone(vid);
    //console.log("this is bruu", pvid[selectedScene].timeline, id);
    const v = pvid[selectedScene].timeline.findIndex((item) => item.eid === id);
    //console.log(v, "found");
    if (v !== -1) {
      pvid[selectedScene].timeline[v].position = { x, y };
      pvid[selectedScene].timeline[v].scale = { height: h, width: w };
      pvid[selectedScene].timeline[v].angle = angle;
    }
    // //console.log("this do be the timeline", pvid[selectedScene].timeline);
    setVid(pvid);
  }

  function addScene() {
    let tvid = clone(vid);
    tvid = [...tvid, { sceneid: uuidv4(), duration: 30, timeline: [] }];
    setVid(tvid);
  }
  function removeScene(sceneid: string) {
    //console.log(sceneid);
    setSelectedScene(0);
    setVid((pvid: Scene[]) => {
      return pvid.filter((item) => {
        if (item.sceneid !== sceneid) return item;
      });
    });
  }

  function addJustTweet() {
    let pvid = [...vid];
    let tid = prompt("TweetID");
    if (tid) {
      pvid[selectedScene].timeline.push({
        eid: "JT-" + uuidv4(),
        element: {
          type: "Tweet",
          id: tid,
          tlink: process.env.NEXT_PUBLIC_URL + "tweet/" + tid + ".png",
        },
        position: { x: 10, y: 20 },
        scale: {
          height: 300,
          width: 300,
        },
        angle: 0,
        zindex: getZIndex(),
      });
      setVid(pvid);
    } else {
      toast("No Tweet ID Given");
    }
  }
  async function addTTSTweet() {
    let pvid = [...vid];
    let tid = prompt("Tweet ID");
    let voice = prompt("male1,female1,male2,female2");
    if (
      tid &&
      voice &&
      ["male1", "female1", "male2", "female2"].includes(voice)
    ) {
      pvid[selectedScene].timeline.push({
        eid: uuidv4(),
        element: {
          type: "TTSTweet",
          audiolink: process.env.NEXT_PUBLIC_URL + "audio/" + tid + ".mp3",
          id: tid,
          tlink: process.env.NEXT_PUBLIC_URL + "tweet/" + tid + ".png",
        },
        position: { x: 10, y: 20 },
        scale: {
          height: 300,
          width: 300,
        },
        angle: 0,
        zindex: getZIndex(),
      });

      const tos = toast.loading("Generating TTS...");
      await axios.get(
        process.env.NEXT_PUBLIC_URL + "audio/" + tid + ".mp3" + "/" + voice
      );
      toast.update(tos, {
        render: "TTS Generated Successfully",
        type: "success",
        isLoading: false,
      });
      toast.dismiss(tos);

      setVid(pvid);
    } else {
      toast("Incorrect inputs");
    }
  }
  function addImage() {
    let imgurl = prompt("Image Direct URL:") || "";
    if (isWebUri(imgurl)) {
      let pvid = [...vid];
      pvid[selectedScene].timeline.push({
        eid: "IM-" + uuidv4(),
        element: {
          type: "Image",
          id: uuidv4(),
          ilink: imgurl,
        },
        position: { x: 10, y: 20 },
        scale: {
          height: 300,
          width: 300,
        },
        angle: 0,
        zindex: getZIndex(),
      });
      setVid(pvid);
    }
  }

  function addText(text: string) {
    let pvid = [...vid];
    pvid[selectedScene].timeline.push({
      eid: uuidv4(),
      element: {
        type: "Text",
        id: uuidv4(),
        content: text,
      },
      position: { x: 10, y: 20 },
      scale: {
        height: 300,
        width: 150,
      },
      angle: 0,
      zindex: getZIndex(),
    });
    setVid(pvid);
  }

  async function rendervideo() {
    const caption = prompt("What's the caption?");
    const id = uuidv4();
    if (caption) {
      const totalduration = vid.reduce((acc, cv) => acc + cv.duration, 0);
      const vidMetaData = {
        bgAudio,
        bgAudioLevel,
        bgVid,
        bgVidAudioLevel,
        totalduration,
        id,
      };
      const tos = toast.loading(
        "This can take up to 10 mins. Check your profile page to see the final video"
      );
      setisRendering(true);
      const { data } = await axios.post("/api/rendervideo", {
        vid,
        vidMetaData,
        caption,
        id,
        userid: localStorage.getItem("userid"),
      });
      //console.log(data);
      setisRendering(false);
      if (data && data.status === "done") {
        toast.update(tos, {
          render: "Video Rendered, Redirecting...",
          type: "success",
          isLoading: false,
        });

        window.location.href = "/app/profile";
      }
      toast.update(tos, {
        render:
          "Awwh snap, Something went wrong, reload the page and try again",
        type: "error",
        isLoading: false,
      });
    } else {
      toast("A caption is needed to publish video to amphitweet");
    }
    //vidLink to users profile
  }

  return (
    <>
      <ToastContainer />

      <ReactTooltip className="text-white" />
      <input
        type="checkbox"
        id="my-modal-3"
        defaultChecked={ispreviewOpen}
        className="modal-toggle"
      />
      {ispreviewOpen && (
        <div className="modal">
          <div className="modal-box relative">
            <div
              onClick={() => setispreviewOpen(false)}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </div>
            <Player
              component={() => (
                <Composition
                  vid={vid}
                  vidMetaData={{
                    bgAudio: bgAudio || "",
                    bgAudioLevel: bgAudioLevel || 0.0,
                    bgVid: bgVid,
                    bgVidAudioLevel: bgVidAudioLevel || 0.1,
                  }}
                />
              )}
              durationInFrames={Math.floor(
                vid.reduce(
                  (accumulator, current) => accumulator + current.duration,
                  0
                )
              )}
              compositionWidth={404}
              compositionHeight={720}
              fps={30}
              controls
            />
          </div>
        </div>
      )}

      <section className="bg-slate-900 text-white p-4 gap-4 min-h-screen h-full grid grid-cols-7 font-dm">
        <div className="col-span-2 grid place-items-center">
          <div>
            <div className="flex items-center gap-3  py-7  ">
              <img src="logo.svg" alt="" />
              <div>
                <div className="-mb-2  italic text-right">Editor</div>
                <div className="text-3xl font-black">AmphiTweet</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <canvas className="border rounded-2xl" ref={canvasRef}></canvas>
              <div className="flex gap-4 bg-slate-800 p-3  rounded-xl ">
                <div className=" flex gap-3">
                  <div
                    data-tip="Bring Forward"
                    className="cursor-pointer"
                    onClick={() => {
                      if (canvas?.getActiveObject()) {
                        let z = vid[selectedScene].timeline.find(
                          //@ts-ignore
                          (item) => item.eid === canvas?.getActiveObject().id
                        )?.zindex;
                        //console.log("this do be z", z);
                        if (z !== undefined) custombringForward(z);
                      } else {
                        toast("Select element to bring front");
                      }
                    }}
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
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      />
                    </svg>
                  </div>
                  <div
                    data-tip="Send Back"
                    className="cursor-pointer"
                    onClick={() => {
                      if (canvas?.getActiveObject()) {
                        let z = vid[selectedScene].timeline.find(
                          //@ts-ignore
                          (item) => item.eid === canvas?.getActiveObject().id
                        )?.zindex;
                        //console.log("this do be z", z);
                        if (z !== undefined) customsendBack(z);
                      } else {
                        toast("Select element to send back");
                      }
                    }}
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
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  onClick={() => setispreviewOpen(true)}
                  data-tip="Preview Final Video"
                  className="cursor-pointer ml-auto "
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                {isRendering && (
                  <div className=" flex justify-center items-center">
                    <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-gray-100"></div>
                  </div>
                )}
                {!isRendering && (
                  <div
                    onClick={rendervideo}
                    data-tip="Post to AmphiTweet"
                    className="cursor-pointer"
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
                        d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-7 col-span-5 flex flex-col h-full">
          <Toolbox
            addText={addText}
            addJustTweet={addJustTweet}
            addImage={addImage}
            addTTSTweet={addTTSTweet}
            selectedScene={selectedScene}
            vid={vid}
            setVid={(vid) => setVid(vid)}
          />
          <div className=" border-purple-500 p-4  grid grid-cols-5 gap-4 mt-auto ">
            <SceneList
              vid={vid}
              selectedScene={selectedScene}
              setSelectedScene={setSelectedScene}
              removeScene={removeScene}
              addScene={addScene}
            />
            <SceneControl
              deleteObject={deleteObject}
              selectedScene={selectedScene}
              setVid={(vid: Scene[]) => {
                setVid(vid);
              }}
              vid={vid}
            />
            <SceneProperties
              setBgVid={(bg: string) => {
                setbgVid(bg);
              }}
              bgVid={bgVid}
              setBgAudio={(bg: string) => {
                setbgAudio(bg);
              }}
              bgAudio={bgAudio}
              bgVidAudioLevel={bgVidAudioLevel}
              setbgVidAudioLevel={(level: number) => {
                setbgVidAudioLevel(level);
              }}
              bgAudioLevel={bgAudioLevel}
              setbgAudioLevel={(level: number) => {
                setbgAudioLevel(level);
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Editor;
