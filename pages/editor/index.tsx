import ReactAudioPlayer from "react-audio-player";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { Scene } from "../_types/Scene";
import { v4 as uuidv4 } from "uuid";
import Toolbox from "./Toolbox";
import SceneList from "./SceneList";
import SceneControl from "./SceneControl";
import SceneProperties from "./SceneProperties";
import clone from "just-clone";
interface EditorProps {}

const Editor: FunctionComponent<EditorProps> = () => {
  const [selectedScene, setSelectedScene] = useState<number>(0);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [vid, setVid] = useState<Scene[]>([
    {
      sceneid: "1",
      duration: 60,
      timeline: [
        {
          eid: uuidv4(),
          element: {
            id: "1553377779810459648",
            type: "Tweet",
            tlink: "https://i.imgur.com/hfp6yI4.png",
          },
          position: { x: 40, y: 50 },
        },
        {
          eid: uuidv4(),
          element: {
            id: uuidv4(),
            type: "Text",
            content: "adsfsrg",
          },
          position: { x: 140, y: 50 },
        },
      ],
    },
  ]);
  //www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3

  useEffect(() => {
    if (!canvas) {
      return;
    }

    vid[selectedScene].timeline.map((ele) => {
      if (ele.element.type === "Tweet") {
        fabric.Image.fromURL(ele.element.tlink, (img) => {
          if (canvas) {
            img.set({
              // @ts-ignore:next-line
              id: ele.eid,
              top: ele.position.x,
              left: ele.position.y,
            });
            canvas.add(img);
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
            });
            canvas.add(img);
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
            });
            canvas.add(img);
          }
        });
      }
      if (ele.element.type === "Text") {
        const txt = new fabric.Text(ele.element.content, {
          fill: "white",
          top: ele.position.x,
          left: ele.position.y,
          // @ts-ignore:next-line
          id: ele.eid,
        });

        canvas.add(txt);
      }
    });

    canvas.on("object:modified", function (e) {
      // @ts-ignore:next-line
      console.log(e.target.id, vid.length);
      // @ts-ignore:next-line
      updatePos(e.target.id, e.target?.top || 42, e.target?.left || 42);
    });
  }, [canvas]);
  // @ts-ignore:next-line
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      height: 720,
      width: 404,
    });

    setCanvas(canvas);
    return () => canvas.dispose();
  }, [canvasRef, vid, selectedScene]);
  function updatePos(id: string, x: number, y: number) {
    let pvid = clone(vid);
    console.log("this is bruu", pvid[selectedScene].timeline, id);
    const v = pvid[selectedScene].timeline.findIndex((item) => item.eid === id);
    console.log(v, "found");
    if (v !== -1) {
      pvid[selectedScene].timeline[v].position = { x, y };
    }
    // console.log("this do be the timeline", pvid[selectedScene].timeline);
    setVid(pvid);
  }
  function addScene() {
    let tvid = clone(vid);
    tvid = [...tvid, { sceneid: uuidv4(), duration: 0, timeline: [] }];
    setVid(tvid);
  }
  function removeScene(sceneid: string) {
    console.log(sceneid);
    setVid((pvid: Scene[]) => {
      return pvid.filter((item) => {
        if (item.sceneid !== sceneid) return item;
      });
    });
  }

  function addJustTweet() {
    let pvid = [...vid];
    pvid[selectedScene].timeline.push({
      eid: "JT-" + uuidv4(),
      element: {
        type: "Tweet",
        id: "1553377779810459648",
        tlink: "https://i.imgur.com/KJZsuBR.png",
      },
      position: { x: 10, y: 20 },
    });
    setVid(pvid);
  }
  function addTTSTweet() {
    let pvid = [...vid];
    pvid[selectedScene].timeline.push({
      eid: "JT-" + uuidv4(),
      element: {
        type: "TTSTweet",
        audioLink:
          "http://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        id: "1553377779810459648",
        tlink: "https://i.imgur.com/KJZsuBR.png",
      },
      position: { x: 10, y: 20 },
    });
    setVid(pvid);
  }
  function addImage() {
    let pvid = [...vid];
    pvid[selectedScene].timeline.push({
      eid: "IM-" + uuidv4(),
      element: {
        type: "Image",
        id: uuidv4(),
        ilink:
          "https://c8.alamy.com/comp/DA9PEC/india-south-india-asia-karnataka-bangalore-city-downtown-skyline-business-DA9PEC.jpg",
      },
      position: { x: 10, y: 20 },
    });
    setVid(pvid);
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
    });
    setVid(pvid);
  }
  return (
    <section className="bg-slate-900 text-white p-4 gap-4 min-h-screen h-full grid grid-cols-7 ">
      <div className="border col-span-2 grid place-items-center">
        <canvas className="border rounded-2xl" ref={canvasRef}></canvas>
      </div>
      <div className="border col-span-5 flex flex-col h-full">
        <Toolbox
          addText={addText}
          addJustTweet={addJustTweet}
          addImage={addImage}
          addTTSTweet={addTTSTweet}
        />
        <div
          className="border border-purple-500 p-4  grid grid-cols-5 gap-4  
        "
        >
          <SceneList
            vid={vid}
            selectedScene={selectedScene}
            setSelectedScene={setSelectedScene}
            removeScene={removeScene}
            addScene={addScene}
          />
          <SceneControl selectedScene={selectedScene} vid={vid} />
          <SceneProperties />
        </div>
      </div>
    </section>
  );
};

export default Editor;
