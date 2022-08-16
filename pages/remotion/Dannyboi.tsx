import { fabric } from "fabric";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { Element } from "../_types/Element";

interface DannyboiProps {
  timeline: Element[];
}

const Dannyboi: FunctionComponent<DannyboiProps> = ({ timeline }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [i, setI] = useState<number>(0);

  const [handle] = useState(() => delayRender());

  useEffect(() => {
    // console.log("i=", i);
    if (i === timeline.length) continueRender(handle);
  }, [i]);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      height: 720,
      width: 404,
    });
    timeline.map((ele) => {
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
            setI((i) => i + 1);
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
            setI((i) => i + 1);
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
            setI((i) => i + 1);
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
        canvas?.add(txt);
        txt.moveTo(ele.zindex);
        setI((i) => i + 1);

        // txt.moveTo(1);
      }
    });
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      {/* <div style={{ color: "white", fontSize: "2em" }}>
        timelineeeeeeeee ={timeline?.length}
      </div> */}
    </div>
  );
};

export default Dannyboi;
