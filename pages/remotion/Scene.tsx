import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { FunctionComponent } from "react";
import { fabric } from "fabric";
import { Canvas } from "fabric/fabric-impl";
interface SceneProps {
  setPos: any;
  defaultPos: any;
}

const Scene: FunctionComponent<SceneProps> = ({ setPos, defaultPos }) => {
  const { editor, onReady } = useFabricJSEditor();
  function onReady1(canvas: Canvas) {
    canvas.setHeight(720);
    canvas.setWidth(404);
    fabric.Image.fromURL("https://i.imgur.com/KJZsuBR.png", function (oImg) {
      oImg.set({ top: defaultPos.top, left: defaultPos.left });
      canvas.add(oImg);
      oImg.bringToFront();

      canvas.on("object:modified", (e) => {
        //console.log(e.target?.aCoords);
        setPos({ top: e.target?.top, left: e.target?.left });
      });
    });

    onReady(canvas);
  }

  return (
    <FabricJSCanvas onReady={onReady1} className="bg-red-600 min-h-full" />
  );
};

export default Scene;
