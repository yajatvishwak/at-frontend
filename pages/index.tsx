import type { NextPage } from "next";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {}, []);
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};

export default Home;
