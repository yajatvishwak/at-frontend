import { Canvas } from "fabric/fabric-impl";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { fabric } from "fabric";
import { FunctionComponent } from "react";
import { Element } from "../_types/Element";

interface DannyboiProps {
  timeline: Element[];
}

const Dannyboi: FunctionComponent<DannyboiProps> = ({ timeline }) => {
  const { editor, onReady } = useFabricJSEditor();

  function onReady1(canvas: Canvas) {
    canvas.setHeight(720);
    canvas.setWidth(404);
    timeline.map((element: Element) => {
      if (element.element.type === "Tweet") {
        fabric.Image.fromURL(element.element.tlink, (oImg) => {
          oImg.set({ top: element.position.x, left: element.position.y });
          canvas.add(oImg);
        });
      }
    });

    onReady(canvas);
  }

  return (
    <div>
      <FabricJSCanvas onReady={onReady1} />
    </div>
  );
};

export default Dannyboi;
