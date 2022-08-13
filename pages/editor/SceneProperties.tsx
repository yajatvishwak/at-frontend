import { FunctionComponent } from "react";

interface ScenePropertiesProps {}

const SceneProperties: FunctionComponent<ScenePropertiesProps> = () => {
  return (
    <div className=" rounded-2xl bg-slate-800 p-4">
      <div>Properties</div>
    </div>
  );
};

export default SceneProperties;
